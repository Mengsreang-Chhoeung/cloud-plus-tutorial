# docker-hello-world

A small Express app used to walk through deploying a container to Sabay Run App. It has a static frontend, a JSON API, and a health endpoint — enough to exercise more of what Run App runs day to day than a single static page.

It reads these environment variables:

- `PORT` — port to listen on (default `3000`)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`)
- `APP_COLOR` — accent color for the button, any CSS color (default `#2563eb`)

## Routes

- `GET /` — the frontend (`public/index.html`)
- `GET /api/config` — returns `{ message, accentColor }` from env vars
- `GET /api/counter` — returns the current visit count
- `POST /api/counter/increment` — increments and returns the visit count
- `GET /health` — returns `{ status, uptimeSeconds }`

The visit counter is **in-memory only** — it resets whenever the container restarts or redeploys. That's intentional: there's no database service wired up yet. It's a stand-in to show what "state" looks like in an app, and a teaching hook for why you'd reach for a persistent store (e.g. a database) once one exists in this tutorial.

## Run locally (no Docker)

```bash
nvm use && npm install
npm run dev
```

Visit http://localhost:3000, click "Visit +1" a few times, then restart the server (`Ctrl+C` and `npm run dev` again) — the counter resets to 0. Try `APP_MESSAGE="hi" APP_COLOR="crimson" npm run dev` and refresh to see both change.

## Run with Docker

```bash
docker build -t run-app-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" -e APP_COLOR="seagreen" run-app-hello
```

Visit http://localhost:3000 to confirm it works the same way containerized. `docker restart <container>` resets the counter the same way a local restart does.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry (e.g. Docker Hub) — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-hello:latest \
     --push .
   ```

   `--push` builds and pushes in one step. If you'd rather build and push separately (e.g. to inspect the image locally first), load it into Docker instead and push manually:

   ```bash
   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-hello:latest \
     --load .

   docker push <your-dockerhub-username>/run-app-hello:latest
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-hello:latest`), setting `APP_MESSAGE` and `APP_COLOR` as Share Env keys so you can see them reflected once deployed.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
