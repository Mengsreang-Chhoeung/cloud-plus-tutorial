# nextjs-hello

A minimal Next.js (App Router) app, deployed to Run App the same way as [`../docker-hello-world`](../docker-hello-world) — except it's a frontend framework instead of plain Express or static HTML. Run App just runs a container image; the language/runtime inside it doesn't matter. `next.config.ts` sets `output: "standalone"` so the Docker image only needs the compiled server, not the whole `node_modules` tree.

It reads:

- `PORT` — port to listen on (default `3000`, handled automatically by the Next.js standalone server)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`)

The page and health route are marked `export const dynamic = "force-dynamic"` so `APP_MESSAGE` is read at request time, not baked in at build time — the same expectation as every other example: `docker run -e APP_MESSAGE=...` takes effect without rebuilding the image.

## Routes

- `GET /` — renders `APP_MESSAGE`
- `GET /health` — returns `{ "status": "ok" }`

## Run locally (no Docker)

```bash
nvm use && npm install
APP_MESSAGE="hi" npm run dev
```

Visit http://localhost:3000.

## Run with Docker

```bash
docker build -t run-app-nextjs-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" run-app-nextjs-hello
```

Visit http://localhost:3000 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-nextjs-hello:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-nextjs-hello:latest`), setting **Container Port** to `3000` and `APP_MESSAGE` as a Share Env key.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
