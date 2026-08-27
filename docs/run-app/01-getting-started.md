# Getting Started with Run App

## Overview

Run App is a Docker hosting service on Cloud+: it lets you deploy and run a containerized website, web app, or service on Sabay's container orchestration infrastructure (Docker swarm), without managing servers yourself.

Each deployed application is called a **stack**. A stack is created from a Docker image you provide, plus configuration (environment variables, resource policy, etc.) set through the RunApp dashboard.

Before you can create a stack, your account needs an active **RunApp subscription** (a plan) — see below.

## RunApp Subscription

If you don't already have a plan, you'll be prompted to add one the first time you try to create a stack:

1. From the top menu, go to **Cloud** → **Run App**. If you have no subscription yet, you'll see an empty state — click **CREATE**.
2. **Account Verification** — your phone number and email must show as **Verified**, then click **NEXT**.
3. **Plans** — pick a plan sized for your project, then click **NEXT**. Plans are priced in KHR/month and scale CPU cores, RAM, and monthly transfer together:

   | Plan     | Price (KHR/mo) | CPU      | RAM    | Transfer |
   | -------- | -------------- | -------- | ------ | -------- |
   | Student  | 18,000         | 0.5 core | 512 MB | 1024 GB  |
   | Basic    | 36,000         | 1 core   | 1 GB   | 2 TB     |
   | Standard | 72,000         | 2 core   | 2 GB   | 4 TB     |
   | Premium  | 180,000        | 4 core   | 8 GB   | 12 TB    |
   | Pro      | 360,000        | 8 core   | 16 GB  | 16 TB    |

4. **Payment** — review the order summary (subtotal + 10% tax), choose to pay from your **KHR** or **Business Gold** wallet balance, then click **PAY NOW**.
   - If your KHR balance is too low, **PAY NOW** stays disabled. Use the wallet menu (top right) → **Reload** to top up: pick a KHR bundle, pay via **ABA KHQR** (scan with any KHR-QR-supporting banking app), and you'll land on a payment-success page once it clears. Return to the create-stack flow and your new balance will be reflected.
5. **Run App Information** — fill in your stack information (see below), then click **CREATE** or **CREATE & DEPLOY**.

Once this completes, you'll see a confirmation that your stack was created.

## Registry Authentication

If your Docker image lives in a private registry, save credentials for it before (or while) creating a stack: on the **Run App** page, switch from the **Stack List** tab to the **Registry Authentication** tab, then click **CREATE REGISTRY**.

- **Registry Provider** — a dropdown of common providers (**Custom**, **Docker Hub**, **Gitlab**, **Azure**, **ProGet**, **Quay**, **AWS ECR**, and more).
- **Host** — the registry's hostname.
- **User Name**
- **Access Token** — a personal access token or password for that registry (masked, with a reveal toggle).

Click **CREATE** to save it. Saved registries then show up as selectable options wherever a stack's **Service Info** → **Registry Authentication** is set to **Private**.

## Create Run App

Once you're on the **Run App Information** step, you're filling in one **Stack**:

- **Stack Name** — a name for your stack.
- **Shared Env** — key/value environment variables shared across every service in the stack. You can add pairs one at a time, or click **Upload Variable From Env File** to import a `.env` file (there's a **Download Sample Env File** button — for a starting template).

Below that, each service in the stack can be configured one of three ways — **Form**, **Editor (Beta)**, or **Upload (Beta)** — all three edit the same underlying stack configuration:

### Form

A service card with three sub-tabs:

- **Service Info**
  - **Service Name**
  - **Domain Name** — **Host Name** (e.g. `sabay.com`) and **Container Port**
  - **Container Image** — e.g. `registry.hub.docker.com/library/busybox:latest`
  - **Registry Authentication** — **Public** (no credentials needed) or **Private**, which lets you pick from registry credentials you've saved beforehand (see below)
  - **Entrypoint** — optional container entrypoint override
  - **Depend On** — select other services in the same stack this one depends on (for multi-service stacks)
- **Environment** — per-service environment variables (separate from the stack-level **Shared Env** above)
- **Policy & Resource** — restart policy and resource limits (see the Editor schema below for the exact fields — this tab wasn't screenshotted directly, but it edits the same `restartPolicy` / `resources` config)

Click **ADD SERVICE** to add another service to the same stack.

### Editor (Beta) / Upload (Beta)

A raw YAML editor for the same configuration (**Upload (Beta)** additionally lets you upload a `.yml` file from your computer, and offers a **Download** sample file). The schema:

```yaml
- serviceName:
  domainName:
  port:
  image:
  entrypoint:
  replicas: 1
  dependsOn:
  privateRegistry:
    provider:
    host:
    username:
    accessToken:
  restartPolicy:
    maxAttempt: 5
    restartWindow: 120s
    delay: 5s
    condition: ANY
  resources:
    cpu: 0.5
    memory: 512
```

This confirms what **Policy & Resource** in the Form covers: `replicas`, a `restartPolicy` (max retry attempts, restart window, delay, and a trigger condition), and `resources` (CPU cores, memory in MB).

Once your service(s) are configured, click **CREATE** to save the stack without deploying, or **CREATE & DEPLOY** to deploy it immediately.

Once finished, you'll see a confirmation that your stack was successfully created.

> **Next:** set up a custom domain in [`02-domain-setup.md`](./02-domain-setup.md), or manage/delete your stack in [`03-managing-and-deleting.md`](./03-managing-and-deleting.md).
