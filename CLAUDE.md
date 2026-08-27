# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A beginner-facing tutorial for Sabay's Cloud+ business services (SabayTEKH PaaS), starting with **Run App** — a Docker container hosting service on MySabay. This is **teaching material, not a product SDK** — Run App has no public API to wrap; it's a dashboard/UI workflow (create a "stack", subscribe to a plan, configure env vars, attach a domain). Docs describe that UI workflow in prose; the one runnable piece is a small Dockerized sample app students can actually build and deploy.

## Repo structure

```
docs/run-app/                        # Written guides, meant to be read in order
├── 01-getting-started.md            # What Run App is, subscription flow, create a stack
├── 02-domain-setup.md               # Attach a custom domain, configure DNS/CNAME
└── 03-managing-and-deleting.md      # Update a stack, check state, delete a stack

examples/run-app/docker-hello-world/ # Runnable sample app to deploy on Run App
├── src/server.js                    # Express app, reads PORT + APP_MESSAGE env vars
├── Dockerfile
└── package.json
```

More Cloud+ services (Storage, Streaming, Transcoder, Database, CMS) will get their own `docs/<service>/` and, where it makes sense, `examples/<service>/` siblings later — none exist yet, and no stub files have been created for them.

## Source material

The content in `docs/run-app/` (and future Cloud+ service docs) is adapted from Sabay's internal Notion page: https://inky-fisher-dcb.notion.site/Cloud-Service-138af76af09380a2a386d90527979c02

That page is the source of truth for what's confirmed vs. not — see "Known intentional gaps" below for UI details it didn't cover.

## Running the example

```bash
cd examples/run-app/docker-hello-world
nvm use && npm install
npm run dev            # local check, no Docker

# or, containerized:
docker build -t run-app-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" run-app-hello
```

No test suite, linter, or build step exists in this repo — there is nothing to run beyond starting the server (locally or in Docker) and curling/opening it.

Always run `nvm use` before any `npm` command in `examples/run-app/docker-hello-world` (the Node version is pinned via `.nvmrc`).

## Architecture of the example

The example exists to give the docs something concrete to deploy and configure, not to demonstrate any Run App API (there isn't one):

- `src/server.js` serves a static frontend (`public/index.html`) plus a small JSON API (`/api/config`, `/api/counter`, `/api/counter/increment`, `/health`). It reads `PORT`, `APP_MESSAGE`, and `APP_COLOR` (defaults `3000`, `"Hello from Run App!"`, `#2563eb`). This mirrors Run App's "Share Env" / Environment tab step in the create-stack wizard (`docs/run-app/01-getting-started.md`) — a student sets these as Share Env key/values when creating their stack and sees them reflected once deployed.
- The visit counter is held in-memory (a plain module-level variable) — it resets on container restart/redeploy. This is deliberate: there's no database service in this repo yet. It exists to make "state" and "health" visible/testable in the deployed app, and as a hook for a future persistence-backed example once a database Cloud+ service gets its own `docs/database/`.
- The `Dockerfile` is the only thing Run App actually consumes — students build and push this image to a registry, then reference it in the Run App create-stack wizard.

## Known intentional gaps

These are teaching gaps, flagged here, not bugs to silently "fix":

- Only Run App is documented so far. Other Cloud+ services (Storage, Streaming, Transcoder, Database, CMS) have no docs yet.
- The create-stack wizard's "Policy & Resource", "Editor (Beta)", and "Upload (Beta)" tabs are now documented in `docs/run-app/01-getting-started.md`, confirmed via live-dashboard screenshots (2026-08-27). "Policy & Resource" itself wasn't screenshotted directly clicked open — its fields are inferred from the Editor (Beta) YAML schema, which edits the same underlying config (`replicas`, `restartPolicy`, `resources`). If that inference ever looks wrong, re-confirm against the Form tab directly.
- The example app has an in-memory visit counter (not real persistence — see "Architecture of the example") and a basic `/health` endpoint, but still no production hardening (no auth, no rate limiting, no request validation beyond what Express does by default). It's a teaching artifact, not a template for a production service.

When editing this repo, preserve this teaching intent: don't invent detail for UI steps that weren't confirmed, and don't quietly expand the example app beyond what the docs actually walk through.
