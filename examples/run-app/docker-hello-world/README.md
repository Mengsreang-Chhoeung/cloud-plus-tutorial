# docker-hello-world

A minimal Express app used to walk through deploying a container to Sabay Run App. It reads two environment variables:

- `PORT` — port to listen on (default `3000`)
- `APP_MESSAGE` — text shown on the root page (default `"Hello from Run App!"`)

## Run locally (no Docker)

```bash
nvm use && npm install
npm run dev
```

Visit http://localhost:3000 — you should see the default message. Try `APP_MESSAGE="hi" npm run dev` and refresh to see it change.

## Run with Docker

```bash
docker build -t run-app-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" run-app-hello
```

Visit http://localhost:3000 to confirm it works the same way containerized.

## Deploy to Run App

1. Push this image to a container registry (e.g. Docker Hub).
2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image, setting `APP_MESSAGE` as a Share Env key so you can see it reflected once deployed.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
