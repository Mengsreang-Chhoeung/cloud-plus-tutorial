# static-nginx-site

The simplest thing you can deploy to Run App: a folder of static HTML served by nginx. No app code, no runtime, no environment variables — just a Dockerfile that copies files into an image.

Use this when you want to host a plain website or landing page and don't need a backend.

## Run locally with Docker

```bash
docker build -t run-app-static-site .
docker run -p 8080:80 run-app-static-site
```

Visit http://localhost:8080. Edit `public/index.html` and rebuild to see changes — there's no dev server/hot reload since there's no app to run.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-static-site:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-static-site:latest`). Set **Container Port** to `80` — that's the port nginx listens on inside the image.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
