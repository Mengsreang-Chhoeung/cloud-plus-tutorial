# python-flask-hello

A minimal Flask app, deployed to Run App the same way as [`../docker-hello-world`](../docker-hello-world) — except it isn't Node. Run App just runs a container image; the language/runtime inside it doesn't matter. This example exists to make that point concrete, so it's deliberately smaller than `docker-hello-world` (one env var, no counter, no API routes beyond a health check).

It reads:

- `PORT` — port to listen on (default `8000`)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`)

## Routes

- `GET /` — renders `APP_MESSAGE`
- `GET /health` — returns `{ status: "ok" }`

## Run locally (no Docker)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
APP_MESSAGE="hi" python app.py
```

Visit http://localhost:8000.

## Run with Docker

```bash
docker build -t run-app-flask-hello .
docker run -p 8000:8000 -e APP_MESSAGE="hi from docker" run-app-flask-hello
```

Visit http://localhost:8000 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-flask-hello:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-flask-hello:latest`), setting **Container Port** to `8000` and `APP_MESSAGE` as a Share Env key.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
