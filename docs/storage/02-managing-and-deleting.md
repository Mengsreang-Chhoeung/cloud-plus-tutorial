# Managing and Deleting a Bucket

## Bucket List

Once you have a project, the **Storage** page shows four tabs — **Bucket List**, **Transcoder**, **Streaming**, **User Management** — plus a **PLAN SETTING** button (top right) for managing your subscription. This page covers **Bucket List** and **User Management**; **Transcoder** and **Streaming** aren't covered here yet.

The **Bucket List** tab shows:

- **Usage** — your current billing cycle's date range, plus **Size** and **Data Transfer** used against your plan's quota.
- **Username** — your project's S3 **Access Key** and **Secret Key** (masked by default), with two icons next to the heading: an eye icon to show/hide the keys, and a regenerate icon to issue a new key pair.
- Your project's name, with a **CONSOLE** button (opens in a new tab) and a card per bucket, each showing the bucket's name, a settings (gear) icon, a delete (trash) icon, and its public URL (with a copy icon).
- A floating **CREATE BUCKET** button to add another bucket to the project, up to your plan's bucket limit (see [`01-getting-started.md`](./01-getting-started.md)).

## Changing your plan

Click **PLAN SETTING** (top right of the Storage page) to open the **Storage Plan Setting** dialog. It shows your current plan (name, **Active** status, price, and billing period, e.g. `Free Plan` / `0 KHR` / `01/Sep/2026 - 30/Sep/2026`) and an **UPGRADE PLAN** button to move to a higher tier (see the plans table in [`01-getting-started.md`](./01-getting-started.md)).

## Bucket settings

Click the settings (gear) icon on a bucket's card to open its **Setting** page:

- **Bucket Privacy** — click **Edit** to choose:
  - **Private** — only you and your sub-users can access the objects.
  - **Public** — anyone with the object URL can read the objects.
- **Bucket Policy** — click **Edit** to set a raw JSON access policy (S3-style `{"Version": "...", "Statement": [...]}`) granting or restricting permissions on the bucket.
- **CORS Configuration** — click **Edit** to allow web applications on other domains to interact with objects in this bucket:
  - **Origin** — one or more allowed origins (e.g. `https://example.com`), added via **Add Origin**.
  - **Access Control Max Age (second)** — how long browsers may cache the CORS preflight response.
  - **Allowed Method** — checkboxes for `GET`, `PUT`, `POST`, `DELETE`, `HEAD`.
  - **Allowed Header** — one or more allowed request headers (e.g. `x-amz-meta-custom`), added via **Add Header**.

Each of these three sections is saved independently via its own **Edit** dialog's **SAVE** button.

## Deleting a bucket

Click the trash icon on the bucket's card. (The confirmation step itself wasn't walked through in this pass — treat it as a standard confirm-to-delete dialog until verified.)

## User Management

The **User Management** tab lets you create scoped S3 sub-users for your project:

1. If you have no sub-users yet, you'll see an empty state — click **ADD**, or use the floating **ADD USER** button.
2. In the **Add Sub-user S3** dialog:
   - **Access Key Name** — a name for this access key.
   - **Bucket & Permission** — search for a bucket to grant access to; selected buckets appear in a table with **Bucket** and **Permission** columns. (The specific permission options weren't opened in this pass.)
3. Click **SAVE**.

This is how you issue additional, bucket-scoped S3 credentials instead of sharing your project's main Access Key / Secret Key from the Bucket List tab.
