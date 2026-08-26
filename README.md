# Cloud+ Tutorial

A beginner-friendly guide to [Sabay's Cloud+](https://cloud.sabay.com) business services (SabayTEKH PaaS) — written for students, one service at a time, each paired with a runnable example where one makes sense.

## Structure

```
cloud-plus-tutorial/
├── docs/
│   └── run-app/                        # Docker app hosting service
│       ├── 01-getting-started.md
│       ├── 02-domain-setup.md
│       └── 03-managing-and-deleting.md
├── examples/
│   └── run-app/
│       └── docker-hello-world/         # Runnable Dockerized sample app
└── README.md
```

## Status

Cloud+ covers several services; this repo grows one at a time.

- [x] **Run App** (Docker app hosting) — `docs/run-app/` + `examples/run-app/docker-hello-world`
- [ ] Storage (S3-compatible) — not started
- [ ] Streaming — not started
- [ ] Transcoder — not started
- [ ] Database — not started
- [ ] CMS — not started

## Prerequisites

- A Cloud Dash account with access to Cloud+
- Docker installed locally, if you want to build/run the Docker example image
- Node.js installed, if you want to run the example without Docker

## Getting Started

1. Read [`docs/run-app/01-getting-started.md`](./docs/run-app/01-getting-started.md) first — it explains what Run App is and how to create your first stack.
2. Then walk through [`examples/run-app/docker-hello-world`](./examples/run-app/docker-hello-world) to build a small app you can actually deploy.
3. Continue with [`02-domain-setup.md`](./docs/run-app/02-domain-setup.md) and [`03-managing-and-deleting.md`](./docs/run-app/03-managing-and-deleting.md) once your stack is running.

## Disclaimer

Menu names, button labels, and steps referenced in this repo were captured from the MySabay Run App dashboard at a point in time and should be verified against the current live dashboard before being taught or relied on — like any UI-driven product, it can change without notice.
