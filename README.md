# DataRecipe
Data Recipe for LLM Training

## GPT 5.4 Prediction Proxy (Azure)

The `Predicted Performance` panel can call an Azure OpenAI `gpt-5.4` deployment through a local proxy.

### 1) Install dependencies

```bash
pip install openai azure-identity
```

### 2) Start the proxy

```bash
python azure_gpt54_prediction_proxy.py
```

By default it uses:

- Endpoint: `https://yuexing-may-26-resource.services.ai.azure.com/openai/v1`
- Deployment: `gpt-5.4`
- Scope: `https://ai.azure.com/.default`
- Local URL: `http://127.0.0.1:8787/predict-performance`

Optional overrides:

```bash
export DATARECIPE_AZURE_OPENAI_ENDPOINT="https://<your-resource>.services.ai.azure.com/openai/v1"
export DATARECIPE_AZURE_OPENAI_DEPLOYMENT="gpt-5.4"
export DATARECIPE_AZURE_OPENAI_SCOPE="https://ai.azure.com/.default"
export DATARECIPE_PREDICTION_HOST="127.0.0.1"
export DATARECIPE_PREDICTION_PORT="8787"
python azure_gpt54_prediction_proxy.py
```

If the proxy is not reachable, DataRecipe automatically falls back to the local heuristic predictor.
