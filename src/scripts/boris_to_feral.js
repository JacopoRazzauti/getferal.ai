window.BORIS_TO_FERAL_SCRIPT = `# ============================================
# FERAL Unified Conversion Script
# Handles BOTH single-label and multi-label BORIS exports
# Supports TSV and CSV
# No upload UI. Reads from INPUT_PATH folder
# ============================================

import os, re, json, math
import csv
from pathlib import Path

DEFAULT_FPS = 30.0

# ---- ask the user once (single-label or multi-label) ----
MODE = input("Are your labels MULTI-LABEL? (y/n): ").strip().lower()
IS_MULTILABEL = (MODE == "y")

# ---- user-defined input folder ----
INPUT_PATH = "/path/to/your/boris_exports"   # ← edit this manually before running

# ---- splitting parameters ----
TRAIN_FRAC = 0.7
VAL_FRAC   = 0.15
TEST_FRAC  = 0.15
SPLIT_STRATEGY = "fractions"   # or "all_train"

# --------------------------------------------
# Helpers
# --------------------------------------------

def _norm_name(s): return re.sub(r"\\s+", "_", str(s).strip().lower())

def _safe_float(x):
    try: return float(x)
    except: return None

def _read_table(path):
    ext = path.suffix.lower()
    delimiter = "\\t" if ext == ".tsv" else ","

    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        reader = csv.reader(f, delimiter=delimiter)
        rows = list(reader)

    if not rows:
        return [], []

    header = [h.strip() for h in rows[0]]
    data = []
    for r in rows[1:]:
        if not any(r): continue
        if len(r) < len(header):
            r = r + [""]*(len(header)-len(r))
        data.append({header[i]: r[i].strip() for i in range(len(header))})
    return header, data

def _find_col(header, key):
    key = key.lower()
    for c in header:
        if c.lower() == key: return c
    for c in header:
        if key in c.lower(): return c
    return None

def _extract_video_name(records, col_media, fallback):
    for r in records:
        p = r.get(col_media, "").strip()
        if p:
            name = Path(p).name
            if "." not in name: name += ".mp4"
            return name
    return fallback + ".mp4"

def _fps_total(records, col_fps, col_total, col_time):
    fps, total = None, None
    for r in records:
        if fps is None:   fps   = _safe_float(r.get(col_fps, "")) if col_fps else None
        if total is None: total = _safe_float(r.get(col_total,"")) if col_total else None
    if not fps or fps <= 0: fps = DEFAULT_FPS
    if not total or total <= 0:
        mx = 0.0
        for r in records:
            t = _safe_float(r.get(col_time,""))
            if t and t > mx: mx = t
        total = mx
    return fps, total

def _collect_behaviors(tsv_paths):
    beh = set()
    for p in tsv_paths:
        header, recs = _read_table(p)
        col_b = _find_col(header, "behavior")
        if not col_b: continue
        for r in recs:
            b = r.get(col_b, "").strip()
            if b: beh.add(_norm_name(b))
    return sorted(beh)

# --------------------------------------------
# Label filling logic
# --------------------------------------------

def _to_frame(t, fps, total_frames):
    if t is None: return None
    f = int(round(t * fps))
    return max(0, min(f, total_frames))

def _labels_single(records, fps, total_frames, col_t, col_b, col_s, beh_to_id):
    labels = [0]*total_frames
    active = {}

    for r in records:
        t = _safe_float(r.get(col_t,""))
        b_raw = r.get(col_b,"").strip()
        s = r.get(col_s,"").strip().upper() if col_s else ""
        if not b_raw or t is None: continue

        beh = _norm_name(b_raw)
        cid = beh_to_id.get(beh, 0)
        f = _to_frame(t, fps, total_frames)
        if f is None: continue

        if s == "START":
            active[beh] = f
        elif s == "STOP":
            if beh in active:
                a, b = active.pop(beh), f
                a, b = min(a,b), max(a,b)
                for ff in range(a, min(b,total_frames)):
                    labels[ff] = cid
        else:
            ff = min(max(0,f), total_frames-1)
            labels[ff] = cid

    return labels

def _labels_multi(records, fps, total_frames, col_t, col_b, col_s, beh_to_id, K):
    labels = [[0]*K for _ in range(total_frames)]
    active = {}

    for r in records:
        t = _safe_float(r.get(col_t,""))
        b_raw = r.get(col_b,"").strip()
        s = r.get(col_s,"").strip().upper() if col_s else ""
        if not b_raw or t is None: continue

        beh = _norm_name(b_raw)
        if beh not in beh_to_id: continue
        cid = beh_to_id[beh]
        f = _to_frame(t, fps, total_frames)
        if f is None: continue

        if s == "START":
            active[beh] = f
        elif s == "STOP":
            if beh in active:
                a, b = active.pop(beh), f
                a, b = min(a,b), max(a,b)
                for ff in range(a, min(b,total_frames)):
                    labels[ff][cid] = 1
        else:
            ff = min(max(0,f), total_frames-1)
            labels[ff][cid] = 1

    return labels

# --------------------------------------------
# Main conversion
# --------------------------------------------

tsv_files = sorted([p for p in Path(INPUT_PATH).iterdir()
                    if p.suffix.lower() in (".tsv", ".csv")])

if not tsv_files:
    raise RuntimeError("No TSV/CSV files found in INPUT_PATH")

behaviors = _collect_behaviors(tsv_files)
if not behaviors:
    raise RuntimeError("No behaviors found, check your files")

beh_to_id = {b:i for i,b in enumerate(behaviors)}

labels_json = {"is_multilabel": IS_MULTILABEL,
               "class_names": {str(i): b for i,b in enumerate(behaviors)},
               "labels": {},
               "splits": {}}

video_files = []

for file in tsv_files:
    header, recs = _read_table(file)
    col_t   = _find_col(header, "time")
    col_b   = _find_col(header, "behavior")
    col_s   = _find_col(header, "status") or _find_col(header, "comment")
    col_m   = _find_col(header, "media file path")
    col_fps = _find_col(header, "fps")
    col_len = _find_col(header, "total length")

    name = _extract_video_name(recs, col_m, file.stem)
    fps, total_sec = _fps_total(recs, col_fps, col_len, col_t)
    total_frames = max(1, int(round(total_sec * fps)))

    if IS_MULTILABEL:
        L = _labels_multi(recs, fps, total_frames, col_t, col_b, col_s, beh_to_id, len(behaviors))
    else:
        L = _labels_single(recs, fps, total_frames, col_t, col_b, col_s, beh_to_id)

    labels_json["labels"][name] = L
    video_files.append(name)

# ---- dataset splits ----
n = len(video_files)
n_train = max(1, int(n*TRAIN_FRAC))
n_val   = int(n*VAL_FRAC)
n_test  = n - n_train - n_val

labels_json["splits"] = {
    "train":     video_files[:n_train],
    "val":       video_files[n_train:n_train+n_val],
    "test":      video_files[n_train+n_val:],
    "inference": video_files
}

# ---- save ----
outpath = Path(INPUT_PATH)/"feral_behavioral_labels.json"
with open(outpath, "w") as f:
    json.dump(labels_json, f, indent=2)

print("Saved JSON:", outpath)
`;
