# Getting Started with Run App

## Overview

Run App is a Docker hosting service on MySabay: it lets you deploy and run a containerized website, web app, or service on Sabay's container orchestration infrastructure (Docker swarm), without managing servers yourself.

Each deployed application is called a **stack**. A stack is created from a Docker image you provide, plus configuration (environment variables, resource policy, etc.) set through the RunApp dashboard.

Before you can create a stack, your account needs an active **RunApp subscription** (a plan) — see below.

## RunApp Subscription

If you don't already have a plan, you'll be prompted to add one the first time you try to create a stack:

1. From the menu, select **RunApp**, then click **Create RunApp**.
2. **Account Verification** — complete verification, then click **Next**.
3. **Plans** — select a plan sized for your project, then click **Next**.
4. **Payment** — confirm payment for the plan and click **PAY NOW**.
   - If you haven't topped up Sabay Gold or Sabay Coin yet, a pop-up will direct you to the Reload page.
5. **Run App Information** — fill in your stack information (see below), then click **Create** or **Create & Deploy**.

Once this completes, you'll see a confirmation that your stack was created.

## Create Run App

To create a stack (once you have an active plan):

1. From the menu, select **RunApp**, then click **Create**.
2. Fill in the stack information:

   | Field | Description |
   |---|---|
   | Stack Name | A name for your stack |
   | Share Env | Key/value environment variables passed to your container |
   | Tab Information | Details entered across the wizard's tabs (see below) |

3. The wizard has several tabs to fill in:
   - **Service Info** — basic service details
   - **Environment** — environment variables (same data as Share Env)
   - **Policy & Resource** — resource/policy configuration
   - **Editor** / **Upload Editor** — editing or uploading configuration directly

4. Click **Create** to save the stack without deploying, or **Create & Deploy** to deploy it immediately.

Once finished, you'll see a confirmation that your stack was successfully created.

> **Next:** set up a custom domain in [`02-domain-setup.md`](./02-domain-setup.md), or manage/delete your stack in [`03-managing-and-deleting.md`](./03-managing-and-deleting.md).
