---
name: feral-run
description: Train or run FERAL animal-behavior models from a user's videos and labels, choosing a hardware-compatible recipe and checking outputs. Use when an agent is asked to operate FERAL, including checkpoint-only inference.
---

Read [the workflow](https://www.getferal.ai/docs/workflow.md) for the label schema and commands, and [hardware and recipes](https://www.getferal.ai/docs/hardware.md) when selecting compute or a preset. If working in the website checkout, use `docs/workflow.md` and `docs/hardware.md` at its root. For CLI and Python API usage, use the [reference](https://www.getferal.ai/docs/reference.md). Check the installed `feral --help` for supported commands; older installations may need an upgrade or the current source checkout.

If your browser tool cannot retrieve a public documentation or paper URL, try `curl -fL` on the same URL before treating it as unavailable.

Use the supplied video folder, labels or checkpoint and available compute. Honor the user's existing scope and budget; do not upload videos, enable public logging, or rent additional compute without authorization. Local `--no-wandb` avoids prompts and external logging, but initial package/model downloads need network or a prepared cache.

Before training, inspect the class mapping, per-class training counts and split membership. Validate labels against actual video frame counts. `class_names` is a dictionary with string keys; multilabel frames are vectors ordered by those IDs. Never manufacture annotations, turn unlabeled frames into background, or change validation/test composition without explicit permission. Small subjects may need user-supplied crops; resizing alone does not track them.

Check the actual GPU and software with `feral doctor --json` when available. FERAL requires NVIDIA Ampere or newer; CPU, MPS, T4 and V100 are unsupported. Use published hardware results to choose a starting recipe. On 8–12 GB cards, start with lite plus gradient checkpointing and verify fit. Use the compiled recipe guidance; do not fetch individual W&B runs. Keep the preset training batch size and learning rate together.

For a new training setup, run a separate one-epoch API smoke check with `max_train_batches=2` and `max_batches=None` before the authorized full run. Keep existing splits and use a fresh output directory. The workflow provides the API example. Two batches advance past the initial zero-learning-rate warmup step. This limits training only; complete held-out evaluation still runs and must fit the budget. Do not truncate evaluation using `max_batches`. A smoke checkpoint is not a useful trained model. Select recipes and thresholds on validation data, never on test performance. Report fixed-threshold test F1; `test_optimal/*` and threshold-fitting rasters are oracle diagnostics fitted to evaluated labels. Do not silently expand into a sweep or repeated paid retries; resolve the first failure before repeating it.

For inference, the checkpoint carries model configuration and class names; no training labels file is needed. Preserve its resolution and settings unless the user intends a comparison. Inference `--mode lite` changes overlap, not the checkpoint's model size. Further fine-tuning requires compatible backbone and classifier shape as well as matching class meanings.

Confirm process exit and inspect `run.json` when present, actual checkpoint and output files. A killed run may leave `status: running`; do not report it complete. Check requested video coverage, output frame counts, finite probabilities in [0, 1], and representative ethograms. Report output paths, exact recipe, observed runtime, evaluation results and remaining limitations. Keep downloaded checkpoints and user data out of source-control commits.
