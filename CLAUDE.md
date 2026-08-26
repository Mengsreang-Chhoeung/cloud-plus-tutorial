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

- `src/server.js` reads `PORT` (default `3000`) and `APP_MESSAGE` (default `"Hello from Run App!"`) and renders `APP_MESSAGE` on the root route. This mirrors Run App's "Share Env" / Environment tab step in the create-stack wizard (`docs/run-app/01-getting-started.md`) — a student sets `APP_MESSAGE` as a Share Env key/value when creating their stack and sees it reflected once deployed.
- The `Dockerfile` is the only thing Run App actually consumes — students build and push this image to a registry, then reference it in the Run App create-stack wizard.

## Known intentional gaps

These are teaching gaps, flagged here, not bugs to silently "fix":

- Only Run App is documented so far. Other Cloud+ services (Storage, Streaming, Transcoder, Database, CMS) have no docs yet.
- The create-stack wizard's "Policy & Resource" and "Editor / Upload Editor" tabs are named in `docs/run-app/01-getting-started.md` but not elaborated on — the source Notion page didn't go into detail on them either. Don't guess at their behavior; confirm against the live dashboard first.
- The example app has no persistence, health checks, or production hardening — it exists purely to demonstrate the env-var / deploy flow.

When editing this repo, preserve this teaching intent: don't invent detail for UI steps that weren't confirmed, and don't quietly expand the example app beyond what the docs actually walk through.
