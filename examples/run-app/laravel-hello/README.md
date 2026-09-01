# laravel-hello

A minimal Laravel app (PHP), deployed to Run App the same way as [`../docker-hello-world`](../docker-hello-world). Run App just runs a container image; the language/runtime inside it doesn't matter. This is the heaviest of the runtime examples — Laravel ships as a full framework (dependencies via Composer), not a single-file app like [`../python-flask-hello`](../python-flask-hello) or [`../go-hello`](../go-hello).

Laravel's default routes run through its `web` middleware group, which needs a working session/cache/queue store — this project keeps the default `database` (SQLite) driver for those, so the container creates and migrates a throwaway SQLite file on every start (`Dockerfile`'s `CMD`). Like the in-memory counter in `docker-hello-world`, this state is not persisted — it resets on every container restart/redeploy.

It reads:

- `PORT` — port to listen on (default `8080`)
- `APP_MESSAGE` — heading text shown on the page (default `"Hello from Run App!"`), read directly from the environment via `env()` — no `.env` entry required

The container runs PHP's built-in server directly (`php -S ... public/index.php`) rather than `php artisan serve` — `artisan serve` spawns the actual server as a subprocess that doesn't reliably inherit `docker run -e` environment variables, which broke the whole point of this example.

## Routes

- `GET /` — renders `APP_MESSAGE`
- `GET /health` — returns `{ "status": "ok" }`

## Run locally (no Docker)

Requires PHP 8.4+ and Composer:

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
APP_MESSAGE="hi" php -S 0.0.0.0:8080 -t public public/index.php
```

Visit http://localhost:8080.

## Run with Docker

```bash
docker build -t run-app-laravel-hello .
docker run -p 8080:8080 -e APP_MESSAGE="hi from docker" run-app-laravel-hello
```

Visit http://localhost:8080 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-laravel-hello:latest \
     --push .
   ```

2. Follow [`../../../docs/run-app/01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/run-app-laravel-hello:latest`), setting **Container Port** to `8080` and `APP_MESSAGE` as a Share Env key.
3. Optionally continue with [`02-domain-setup.md`](../../../docs/run-app/02-domain-setup.md) to attach a custom domain.
