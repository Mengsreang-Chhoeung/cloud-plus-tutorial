# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A beginner-facing tutorial for Sabay's Cloud+ business services (SabayTEKH PaaS), starting with **Run App** — a Docker container hosting service on Cloud Dash. This is **teaching material, not a product SDK** — Run App has no public API to wrap; it's a dashboard/UI workflow (create a "stack", subscribe to a plan, configure env vars, attach a domain). Docs describe that UI workflow in prose; the one runnable piece is a small Dockerized sample app students can actually build and deploy.

## Repo structure

```
docs/run-app/                        # Written guides, meant to be read in order
├── 01-getting-started.md            # What Run App is, subscription flow, create a stack
├── 02-domain-setup.md               # Attach a custom domain, configure DNS/CNAME
└── 03-managing-and-deleting.md      # Update a stack, check state, delete a stack

examples/run-app/                    # Runnable sample apps to deploy on Run App
├── docker-hello-world/               # Express app: env vars, JSON API, in-memory counter, /health
├── static-nginx-site/                # Plain HTML behind nginx — no app code, smallest possible deploy
├── python-flask-hello/               # Minimal Flask app — same env-var pattern, different runtime
└── multi-service-stack/              # Two Express services (web + api) in one stack — dependsOn / ADD SERVICE
```

More Cloud+ services (Storage, Streaming, Transcoder, Database, CMS) will get their own `docs/<service>/` and, where it makes sense, `examples/<service>/` siblings later — none exist yet, and no stub files have been created for them.

## Source material

The content in `docs/run-app/` (and future Cloud+ service docs) is adapted from Sabay's internal Notion page: https://inky-fisher-dcb.notion.site/Cloud-Service-138af76af09380a2a386d90527979c02

That page is the source of truth for what's confirmed vs. not — see "Known intentional gaps" below for UI details it didn't cover.

## Running the examples

Each example under `examples/run-app/` has its own README with exact run/build/deploy steps. Quick-start for the primary one:

```bash
cd examples/run-app/docker-hello-world
nvm use && npm install
npm run dev            # local check, no Docker

# or, containerized:
docker build -t run-app-hello .
docker run -p 3000:3000 -e APP_MESSAGE="hi from docker" run-app-hello
```

No test suite, linter, or build step exists in this repo — there is nothing to run beyond starting the server(s) (locally or in Docker) and curling/opening them.

Always run `nvm use` before any `npm` command in a Node-based example (`docker-hello-world`, `multi-service-stack/api`, `multi-service-stack/web`) — the Node version is pinned via `.nvmrc` in each.

## Architecture of docker-hello-world

This is the primary example — the others under `examples/run-app/` exist to demonstrate one specific thing each (a different runtime, a static-only deploy, a multi-service stack) and are intentionally smaller. `docker-hello-world` exists to give the docs something concrete to deploy and configure, not to demonstrate any Run App API (there isn't one):

- `src/server.js` serves a static frontend (`public/index.html`) plus a small JSON API (`/api/config`, `/api/counter`, `/api/counter/increment`, `/health`). It reads `PORT`, `APP_MESSAGE`, and `APP_COLOR` (defaults `3000`, `"Hello from Run App!"`, `#2563eb`). This mirrors Run App's "Share Env" / Environment tab step in the create-stack wizard (`docs/run-app/01-getting-started.md`) — a student sets these as Share Env key/values when creating their stack and sees them reflected once deployed.
- The visit counter is held in-memory (a plain module-level variable) — it resets on container restart/redeploy. This is deliberate: there's no database service in this repo yet. It exists to make "state" and "health" visible/testable in the deployed app, and as a hook for a future persistence-backed example once a database Cloud+ service gets its own `docs/database/`.
- The `Dockerfile` is the only thing Run App actually consumes — students build and push this image to a registry, then reference it in the Run App create-stack wizard.

## Known intentional gaps

These are teaching gaps, flagged here, not bugs to silently "fix":

- Only Run App is documented so far. Other Cloud+ services (Storage, Streaming, Transcoder, Database, CMS) have no docs yet.
- The create-stack wizard's "Policy & Resource", "Editor (Beta)", and "Upload (Beta)" tabs are documented in `docs/run-app/01-getting-started.md`, confirmed via live-dashboard screenshots (2026-08-27 for Editor/Upload; 2026-09-01 for Policy & Resource's own Form fields — Restart Policy, Replicas, and per-replica Resource dropdowns).
- `docker-hello-world` has an in-memory visit counter (not real persistence — see "Architecture of docker-hello-world") and a basic `/health` endpoint, but still no production hardening (no auth, no rate limiting, no request validation beyond what Express does by default). None of the `examples/run-app/` apps are templates for a production service.
- `multi-service-stack`'s `web` service reaches `api` via a configurable `API_URL` env var rather than an assumed hostname, because how services address each other *inside* a deployed Run App stack (service-name DNS vs. requiring a public domain) isn't confirmed by the Notion source. Confirm against the live dashboard before asserting a specific mechanism.

When editing this repo, preserve this teaching intent: don't invent detail for UI steps that weren't confirmed, and don't quietly expand any example app beyond what the docs actually walk through.
