# Released CLI and Python API

Install with `python -m pip install feral` in a Python 3.10+ environment with a compatible CUDA-enabled PyTorch installation. The supported execution target is an NVIDIA Ampere-or-newer GPU; see [hardware](hardware.md). Native Windows is not a tested execution environment; use Linux/WSL2. The repository README lists the tested environment.

## Commands

```bash
feral reencode /path/to/originals /path/to/encoded
feral train /path/to/videos /path/to/labels.json --mode lite --no-wandb
feral infer /path/to/model.pt /path/to/new_videos --output /path/to/predictions.json
```

Re-encoding requires an input folder containing only videos and an empty output folder. Training needs frame labels; [the label schema](workflow.md#labels) describes the single JSON file. Checkpoints carry model configuration and class names, so inference needs no labels JSON.

Omit `--mode` for default training, or choose `lite`, `max`, or `rare`. `--gradient-checkpointing` reduces training memory use. `--no-wandb` disables logging noninteractively; `--public-wandb` enables public community logging. Without either, training asks which logging option to use. Do not combine the two flags. `--checkpoint PATH` supplies starting weights, which must match the chosen backbone and classifier.

Inference options include `--batch_size 8`, `--num_workers 4`, and `--mode lite`/`--mode max` for overlap/smoothing settings. Inference modes do not change model size. Leave resolution as trained unless deliberately evaluating a change. Run `feral COMMAND --help` for the installed option list.

## Python

The Python API exposes `run_training`, `run_inference_folder`, `apply_mode`, `validate_labels_json`, `BACKBONES`, `FeralModel`, and `ClsDataset`. Load internal defaults as a package resource, independent of the working directory:

```python
import json
from importlib.resources import files
import yaml
import feral

cfg = yaml.safe_load(files("feral").joinpath("default_config.yaml").read_text())
cfg = feral.apply_mode(cfg, "lite")
cfg["data"].update(prefix="/path/to/videos", label_json="/path/to/labels.json")
cfg.pop("wandb", None)
with open(cfg["data"]["label_json"]) as handle:
    labels = json.load(handle)
feral.validate_labels_json(labels, cfg["data"]["prefix"])
feral.run_training(cfg)
```

`run_training` returns `None`. By default, it writes `answers/` and `checkpoints/` relative to the working directory. Set `cfg["output_dir"]` to a fresh directory to keep the run’s outputs and `run.json` together. The default recipe trains 10 epochs, with training batch size 4, evaluation batch size 8, 64-frame windows and 256-pixel square input. Validation selects the checkpoint; without validation, the last epoch is saved. `do_aa` enables TrivialAugmentWide, not anti-aliasing.

```python
feral.run_inference_folder(
    checkpoint_path="/path/to/model.pt",
    video_folder="/path/to/new_videos",
    output="/path/to/predictions.json",
)
```

The [automation workflow](workflow.md) covers structured diagnostics and output manifests. Check `feral --help` for availability in your installation.
