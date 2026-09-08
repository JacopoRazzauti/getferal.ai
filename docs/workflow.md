# Run FERAL on your videos

FERAL learns predefined behaviors from frame labels. It produces per-frame class probabilities; it does not discover new behavior classes, track identities, or measure joint kinematics. Start with your videos and `labels.json`, or use a compatible [starter checkpoint](https://www.getferal.ai/pretrained_checkpoints/) for inference.

## Install and check

These examples use `doctor`, `validate`, `--output-dir`, `load_default_config`, and `max_train_batches`. Check `feral --help` for support in your installation. If a command is missing, upgrade FERAL or install the current source checkout with `python -m pip install -e /path/to/feral`. See the [CLI and Python API reference](reference.md).

Use an NVIDIA Ampere-or-newer GPU. CPU, Apple MPS, T4 and V100 are not supported for training/inference. See [hardware and recipes](hardware.md) before choosing a machine.

```bash
feral doctor --json
feral validate /path/to/videos /path/to/labels.json --json
```

`doctor` returns exit code 0 when its environment checks pass, 1 otherwise. It does not prove a particular model fits in VRAM. `validate` returns 0 for valid input, 1 for invalid input; read its errors before training. Validation checks annotation structure, file references and frame counts, not whether the human annotations describe the behavior correctly.

## Labels

One `labels.json` contains four keys:

- `class_names`: a dictionary with consecutive **string** keys, such as `{"0": "other", "1": "grooming"}`.
- `is_multilabel`: `false` for one class per frame, `true` for simultaneous classes.
- `labels`: video filename → frame labels, in decoded frame order. Single-label frames are integer class IDs; multilabel frames are binary lists in class-ID order, such as `[0, 1]`. The number of entries must match the video's frame count.
- `splits`: lists of filenames under `train`, `val`, `test`, and optionally `inference`. Training/validation/test videos require labels; inference videos do not.

Keep existing class meanings and train/validation/test membership. Do not invent labels, treat missing annotations as background, or move held-out videos into training. If a schema or split needs changing, resolve that with the dataset owner. The single-file format means adding/removing sessions requires updating this file; per-video label files are not supported.

Re-encoding can improve decoding performance:

```bash
feral reencode /path/to/originals /path/to/encoded
```

The input folder must contain only videos and the output folder must be empty. Validate the encoded files against the labels afterward. Resizing does not track or crop small subjects; inspect representative frames to check that the target behavior remains visible.

## Train and inspect outputs

```bash
feral train /path/to/videos /path/to/labels.json --mode lite --no-wandb --output-dir /path/to/runs/first
```

Omit `--mode` for the default model. Add `--gradient-checkpointing` for lower VRAM use; see the measured trade-offs in [hardware.md](hardware.md). Use a fresh output directory per run. `--no-wandb` avoids the interactive logging prompt and external W&B logging. Initial package/model downloads still require network access unless cached. `--public-wandb` explicitly enables public community logging; use it only when that is intended.

For a small execution check before a full run, the Python API supports limiting batches without editing labels or splits:

```python
import feral

cfg = feral.apply_mode(feral.load_default_config(), "lite")
cfg["data"].update(prefix="/path/to/videos", label_json="/path/to/labels.json")
cfg["training"].update(epochs=1, compile=False)
cfg["max_batches"] = None
cfg["max_train_batches"] = 2
cfg["output_dir"] = "/path/to/runs/smoke"
cfg.pop("wandb", None)
feral.run_training(cfg)
```

Two batches advance past the initial zero-learning-rate warmup step. This limits training only; validation, test and inference still process their complete existing splits, so include that cost in the run budget. Do not use `max_batches` to truncate held-out evaluation. The training split must contain enough chunks for one full training batch (4 by default); do not alter held-out splits to make a smoke run fit. A smoke run checks execution, not model quality. Keep its outputs separate and remove the batch limit for the full run. Training is epoch-based: total time grows with the number of video chunks and epochs. Existing validation data selects checkpoints; without a validation split, the last epoch is saved. Do not select recipes on test scores.

For runs with `output_dir`, `run.json` records status (`running`, `completed`, or `failed`), the resolved recipe, label-file SHA-256 and canonical split SHA-256 (not video-content hashes), timestamps and absolute checkpoint/output paths. The output directory must be new or empty. Inspect `run.json`, the checkpoint under `checkpoints/`, and predictions under `answers/`. A terminated process can leave a `running` manifest; confirm the process exit and output files before declaring success. Check that inference covers every requested video, frame counts agree, probabilities are finite and within [0, 1], and representative ethograms look plausible. Report per-class results as well as averages when labels are available. For paper comparisons, use `test/frame_level_map`; `test/map` and `test/ap_*` summarize raw overlapping predictions, so per-class frame AP must be calculated after ensembling. `test_optimal/*` metrics and threshold-fitting rasters fit thresholds to the evaluated labels: they are oracle diagnostics, not unbiased test results. Report fixed-threshold test F1; select thresholds and recipes on validation data only.

## Infer elsewhere

```bash
feral infer /path/to/model.pt /path/to/new_videos --output /path/to/predictions.json
```

Checkpoints contain class names and model configuration, so this command does not require the training labels file. Preserve the trained resolution and default inference settings unless intentionally comparing an alternative. Inference `--mode lite` changes overlap; it does **not** turn a large checkpoint into a small model. Starting weights for further training must match the backbone and classifier shape; matching class count alone does not establish matching class meanings.

For an agent, point it to this page, your video folder and label file, available compute, and your run budget. The [FERAL skill](../skills/feral-run/SKILL.md) adds the execution workflow. It does not grant permission to upload data or rent compute beyond your existing instructions.
