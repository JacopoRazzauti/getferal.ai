"""Copy the shared-vault FERAL skill to the website; --check detects drift."""
import argparse
import os
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--check", action="store_true")
args = parser.parse_args()
vault = os.environ.get("FERAL_SHARED_DOCS")
if not vault:
    parser.error("FERAL_SHARED_DOCS must point to the shared vault")
source = Path(vault) / "shared_claude/skills/feral-run/SKILL.md"
target = Path(__file__).resolve().parents[1] / "skills/feral-run/SKILL.md"
if args.check:
    if not target.exists() or source.read_bytes() != target.read_bytes():
        parser.exit(1, "Website skill differs from shared-vault source; run scripts/sync_skill.py\n")
else:
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(source.read_bytes())
