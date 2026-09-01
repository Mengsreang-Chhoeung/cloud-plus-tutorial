# Cloud+ Tutorial

A beginner-friendly guide to [Sabay's Cloud+](https://cloud.sabay.com) business services (SabayTEKH PaaS) — written for students, one service at a time, each paired with a runnable example where one makes sense.

## Structure

```
cloud-plus-tutorial/
├── docs/
│   ├── run-app/                        # Docker app hosting service
│   │   ├── 01-getting-started.md
│   │   ├── 02-domain-setup.md
│   │   └── 03-managing-and-deleting.md
│   └── storage/                        # S3-compatible object storage service
│       ├── 01-getting-started.md
│       └── 02-managing-and-deleting.md
├── examples/
│   └── run-app/
│       ├── docker-hello-world/         # Node/Express — env vars, JSON API, in-memory counter
│       ├── static-nginx-site/          # Plain HTML behind nginx — smallest possible deploy
│       ├── python-flask-hello/         # Minimal Flask app
│       ├── multi-service-stack/        # Two services in one stack (web + api)
│       ├── go-hello/                   # Minimal Go (net/http)
│       ├── laravel-hello/              # Minimal Laravel (PHP)
│       ├── nextjs-hello/               # Minimal Next.js (App Router)
│       ├── nestjs-hello/               # Minimal NestJS
│       └── springboot-hello/           # Minimal Spring Boot (Java)
└── README.md
```

## Status

Cloud+ covers several services; this repo grows one at a time.

- [x] **Run App** (Docker app hosting) — `docs/run-app/` + `examples/run-app/docker-hello-world`
- [x] **Storage** (S3-compatible object storage) — `docs/storage/` (no runnable example yet)
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

Menu names, button labels, and steps referenced in this repo were captured from the Run App Cloud Dash dashboard at a point in time and should be verified against the current live dashboard before being taught or relied on — like any UI-driven product, it can change without notice.
