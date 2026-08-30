# multi-service-stack

Two small Express services — `api` (returns a JSON list) and `web` (fetches from `api` and renders it as HTML) — deployed as **one Run App stack with two services**. This is the example to use when walking through the **ADD SERVICE** button and the `dependsOn` field described in [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md), rather than the single-service flow `docker-hello-world` and `python-flask-hello` use.

- `api/` — `GET /api/items`, `GET /health`. Reads `PORT` (default `4000`).
- `web/` — `GET /` (renders items from `api`), `GET /health`. Reads `PORT` (default `3000`) and `API_URL` (default `http://localhost:4000`), which it uses to reach the `api` service.

## Run locally with Docker Compose

Compose gives each service a container hostname automatically, so `web` reaches `api` at `http://api:4000` — that's what `docker-compose.yml` sets `API_URL` to.

```bash
docker compose up --build
```

Visit http://localhost:3000 — it should show three items fetched from the `api` service. Visit http://localhost:4000/api/items directly to see the `api` service's raw response.

## Deploy to Run App

1. Build **both** images for `linux/amd64` and push them to a registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-multi-service-api:latest \
     --push ./api

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-multi-service-web:latest \
     --push ./web
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create **one stack** containing both services:
   - Add the `api` service first (**Service Info** → your `run-app-multi-service-api` image, container port `4000`).
   - Click **ADD SERVICE** and add `web` (your `run-app-multi-service-web` image, container port `3000`), setting **Depend On** to the `api` service.
   - Or skip the Form entirely and paste [`run-app-stack.example.yml`](./run-app-stack.example.yml) into the **Editor (Beta)** tab, filling in your own image names and domains first.
3. Set `API_URL` for the `web` service (per-service **Environment** tab, or Shared Env) so it points at wherever the `api` service ends up reachable — its assigned domain, most likely. **How services address each other *inside* a Run App stack isn't confirmed by the source material this repo is based on** (see `CLAUDE.md` → Known intentional gaps); this example keeps `API_URL` fully configurable so it works however that turns out to behave, rather than assuming Docker Swarm's usual service-name DNS applies here unconfirmed.

## Local development (single service)

Each service also runs standalone for quick edits:

```bash
cd api && nvm use && npm install && npm run dev   # http://localhost:4000
cd web && nvm use && npm install && npm run dev   # http://localhost:3000, API_URL defaults to localhost:4000
```
