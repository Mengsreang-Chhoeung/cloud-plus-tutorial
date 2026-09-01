# springboot-hello

A minimal Spring Boot app (Java, Maven), deployed to Run App the same way as [`../docker-hello-world`](../docker-hello-world). Run App just runs a container image; the language/runtime inside it doesn't matter. The `Dockerfile` is multi-stage: a `maven` builder stage compiles the jar, and the final image is a lean JRE-only base running just that jar — no Maven or build tooling in the shipped image.

It reads:

- `PORT` — port to listen on (default `8080`)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`)

## Routes

- `GET /` — renders `APP_MESSAGE`
- `GET /health` — returns `{ "status": "ok" }`

## Run locally (no Docker)

Requires a local JDK 21 and Maven (or use the included wrapper):

```bash
APP_MESSAGE="hi" ./mvnw spring-boot:run
```

Visit http://localhost:8080.

## Run with Docker

```bash
docker build -t run-app-springboot-hello .
docker run -p 8080:8080 -e APP_MESSAGE="hi from docker" run-app-springboot-hello
```

Visit http://localhost:8080 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-springboot-hello:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-springboot-hello:latest`), setting **Container Port** to `8080` and `APP_MESSAGE` as a Share Env key.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
