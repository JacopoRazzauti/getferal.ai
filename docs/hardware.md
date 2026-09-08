# Hardware and training recipes

FERAL requires an NVIDIA GPU with compute capability ≥8.0 (Ampere or newer), BF16 and FlashAttention support. T4/V100, CPU and Apple MPS are not supported. **24 GB is not a minimum:** the paper benchmarks 8–12 GB consumer GPUs with gradient checkpointing.

These are published measurements/estimates from [bioRxiv v2, July 13, 2026, Table 3](https://www.biorxiv.org/content/10.1101/2025.11.16.688666v2.full.pdf). Training times estimate a full CalMS21 run (10 epochs). Inference times are for one hour of 30-fps video. They are guidance, not guarantees for other datasets, hosts or resolutions.

| GPU | VRAM | Recipe | Training | Inference |
| --- | ---: | --- | ---: | ---: |
| H100 SXM | 80 GB | default | 3.0 h | 2.3 min |
| RTX 5090 | 32 GB | default | 7.0 h | 4.6 min |
| A100 SXM | 80 GB | default | 7.2 h | 4.8 min |
| L40S | 48 GB | default | 7.1 h | 4.9 min |
| RTX 3090 | 24 GB | default | 18.3 h | 11.8 min |
| RTX 3080 | 10 GB | lite + checkpointing | 16.5 h | 5.3 min |
| RTX 3070 | 8 GB | lite + checkpointing | 24.2 h | 8.0 min |
| RTX 3060 | 12 GB | lite + checkpointing | 38.4 h | 12.5 min |

The CLI spelling is `--mode lite --gradient-checkpointing`. For 8–12 GB cards, start there and check fit on your data. With more memory, choose default for a baseline or lite for a faster first experiment. `max` uses denser temporal overlap, 9-frame smoothing and EMA; it costs more and is not uniformly better. All presets currently use 256-pixel square input by default, including the 384-native lite backbone.

Table 8 reports the following **mAP (%)**:

| Dataset | lite | default | max |
| --- | ---: | ---: | ---: |
| CalMS21 | 94.0 | 94.2 | 94.7 |
| Adult-larva | 83.6 | 91.4 | 94.2 |
| PanAf500 | 80.6 | 84.4 | 83.3 |

These values belong to that comparison; do not substitute a different headline result. `rare` is an additional code preset for rare classes (disables MixUp, label smoothing and EMA; adds gradient clipping and caps class weights). It is not a Table 8 benchmark winner. Choose it using training-label frequencies and validation evidence, not merely the species name.

## Using public W&B experiments

[Community runs](https://wandb.ai/sposiboh/feral_public) can suggest experiments. A high score alone is not a reusable recipe. Before borrowing a configuration, record its run URL, code revision if available, backbone/checkpoint, class mapping, dataset and split identity, resolution, epochs, batch sizes, overlap, augmentation, EMA, metric definition and compute. Exclude failed/incomplete runs and comparisons with incompatible splits or labels. Treat missing provenance as unknown, not a match.

Compare a small number of compatible recipes on the existing validation split and within the user's compute budget. Preserve the test split for final evaluation. Record the chosen configuration and observed runtime with the outputs. Published Tables 3 and 8 are the starting evidence; community experiments are candidate recipes until reproduced on your data.

The unreleased source checkout includes a read-only exporter (run from the code repository):

```bash
python scripts/export_recipe_candidates.py --project sposiboh/feral_public --limit 20 --output candidates.json
```

It uses existing W&B authentication/environment settings and fetches full run details. Output includes allowlisted recipe parameters, validation summary metrics (never test metrics), runtime, source links, and missing provenance. `labels_sha256` and `splits_sha256` are required to establish comparable data; `insufficient_evidence` or `needs_review` is not a recommendation. The exporter does not rank a best recipe or run training. This script is not part of PyPI 1.0.0.
