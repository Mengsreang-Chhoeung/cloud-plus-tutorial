# nestjs-hello

A minimal NestJS app, deployed to Run App the same way as [`../docker-hello-world`](../docker-hello-world) — a structured, decorator-based alternative to plain Express. Run App just runs a container image; the language/runtime inside it doesn't matter.

It reads:

- `PORT` — port to listen on (default `3000`)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`)

## Routes

- `GET /` — renders `APP_MESSAGE`
- `GET /health` — returns `{ "status": "ok" }`

## Run locally (no Docker)

```bash
nvm use && npm install
APP_MESSAGE="hi" npm run start
```

Visit http://localhost:3000.

## Run with Docker

```bash
docker build -t run-app-nestjs-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" run-app-nestjs-hello
```

Visit http://localhost:3000 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-nestjs-hello:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-nestjs-hello:latest`), setting **Container Port** to `3000` and `APP_MESSAGE` as a Share Env key.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
