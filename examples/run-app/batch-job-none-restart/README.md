# batch-job-none-restart

A container that does a fixed amount of "work" and then exits — standing in for a one-off job like a database migration or a data import. It exists to give the **Restart Condition = None** option (see [`01-getting-started.md`](../../../docs/run-app/01-getting-started.md)) something concrete to demonstrate, since every other example in this repo is a long-running server that's *supposed* to keep running.

It reads these environment variables:

- `PORT` — port to listen on (default `3000`)
- `JOB_NAME` — label used in logs and the status response (default `demo-migration`)
- `WORK_SECONDS` — how long to "work" before exiting (default `10`)
- `FAIL` — set to `true` to exit with a non-zero code instead of succeeding (default `false`)

While it's working it serves one route so you can check on it before it exits:

- `GET /` — returns `{ job, status, uptimeSeconds }`, where `status` is `running`, `done`, or `failed`

After `WORK_SECONDS`, the process exits — `0` normally, or `1` if `FAIL=true`.

## Why Restart Condition matters here

A stack's **Policy & Resource** tab lets you set **Restart Condition** to **Any**, **On failure**, or **None**. For a long-running server (like [`docker-hello-world`](../docker-hello-world/)), you almost always want **Any** — if it crashes or exits for any reason, Run App should bring it back.

A one-off job like this one is the opposite case: it's *supposed* to exit. If you leave **Restart Condition** on **Any**, Run App will keep restarting it forever, effectively turning a job that should run once into an infinite loop that keeps re-running it. Setting **Restart Condition** to **None** tells Run App: don't restart this service no matter how or why it exits — start it once, let it finish, leave it stopped.

- **None** — run once, exit, stay stopped either way. Use for a migration, seed script, or import job you trigger by deploying.
- **On failure** — only restart on a non-zero exit. Closer to what you'd want for a job you *do* want retried a few times if it fails transiently (combine with **Restart Max Attempts** so it doesn't retry forever), but not restarted after it succeeds.
- **Any** — restart regardless of exit code. Right for long-running servers, wrong for a job that's expected to finish.

## Run locally (no Docker)

```bash
nvm use
npm start
```

Watch it log `working for 10s`, then `done`, then exit. Try `FAIL=true npm start` to see the failure path, and `WORK_SECONDS=3 npm start` to make it exit sooner.

## Run with Docker

```bash
docker build -t run-app-batch-job .
docker run -p 3000:3000 -e JOB_NAME="import-2026-09" -e WORK_SECONDS=5 run-app-batch-job
```

`docker ps -a` afterward shows the container as `Exited (0)` — it doesn't come back on its own. Docker's own `--restart` flag isn't set here; Run App's Restart Policy is what this example is about, and that only applies once the image is deployed as a Run App stack.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry, same as the other examples:

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/run-app-batch-job:latest \
     --push .
   ```

2. Follow [`01-getting-started.md`](../../../docs/run-app/01-getting-started.md) to create a stack from that image, setting `JOB_NAME`, `WORK_SECONDS`, and/or `FAIL` as Share Env keys.
3. In **Policy & Resource**, set **Restart Condition** to **None**, then **CREATE & DEPLOY**.
4. In [`03-managing-and-deleting.md`](../../../docs/run-app/03-managing-and-deleting.md)'s service view, watch the service run once and stop — it won't come back. Then try redeploying the same stack with **Restart Condition** set to **Any** instead, and **FAIL=true**, to see the crash-loop behavior this option is meant to avoid for a job like this.
