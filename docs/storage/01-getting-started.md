# Getting Started with Storage

## Overview

Storage is an S3-compatible object storage service on Cloud+: it lets you create **buckets** to store and serve files, accessible either via a public HTTPS URL or S3 API access keys, without running your own storage infrastructure.

Buckets live inside a **Project** — the top-level container you name once, the first time you create a bucket. A project can hold multiple buckets, up to your plan's limit.

Before you can create a bucket, your account needs an active **Storage plan** — see below.

## Storage Subscription

If you don't already have a project, you'll be prompted to create one the first time you visit Storage:

1. From the top menu, go to **Cloud** → **Storage**. If you have no project yet, you'll see an empty state — click **CREATE**.
2. **Account Verification** — your phone number and email must show as **Verified**, then click **NEXT**.
3. **Plans** — pick a plan sized for your project, then click **NEXT**. Plans are priced in KHR/month and scale bucket count, transfer, and total size together:

   | Plan       | Price (KHR/mo) | Buckets | Transfer | Size     |
   | ---------- | --------------- | ------- | -------- | -------- |
   | Free Plan  | Free            | 1       | 100 GB   | 1 GB     |
   | Starter    | 24,000          | 2       | 0.5 TB   | 250 GB   |
   | Basic      | 96,000          | 4       | 2 TB     | 250 GB   |
   | Standard   | 240,000         | 5       | 4 TB     | 500 GB   |
   | Premium    | 360,000         | 10      | 5 TB     | 1000 GB  |
   | Pro        | 600,000         | 20      | 6 TB     | 2000 GB  |
   | Enterprise | 2,000,000       | 20      | 30 TB    | 10000 GB |

   If you already have an active subscription to another Cloud+ service (e.g. Run App), the **Free Plan** is available to you for Storage as well.

4. **Payment** — review the order summary (Sub-total / Total) and click **PAY NOW**. For the Free Plan, both show `0 BG` (Business Gold) and there's nothing to pay.
5. **Bucket Information** — fill in your **Bucket Name** and **Project Name**, then click **CREATE** (disabled until both fields are filled).

Once this completes, you'll see a **Bucket Created Successfully** confirmation showing your **Project Name**, **Bucket Name**, and **Bucket URL** (e.g. `https://fsgw.sabay.com/<bucket-name>`) — this URL is how the bucket is publicly reachable. From here you can go to **Storage Home** or click **ADD MORE BUCKET** to create another one in the same project.

> **Next:** manage your buckets and access keys in [`02-managing-and-deleting.md`](./02-managing-and-deleting.md).
