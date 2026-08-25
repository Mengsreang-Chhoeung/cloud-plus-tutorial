# Domain Setup

You can attach a custom domain to a Run App stack either while creating it, or later by updating it.

## Add your domain during the Create process

1. Click **Create Stack**.
2. Provide the stack information (see [`01-getting-started.md`](./01-getting-started.md)), add your domain, then click **Create & Deploy**. This deploys your application directly.

## Add your domain during the Update process

1. Click the ellipsis (three dots) menu on your stack.
2. From the dropdown, click **Edit**.
3. Add your domain, then click **Update** or **Pull & Update**. This deploys your application directly.
4. Click on the stack to view its details.
   - Make sure the state is **Running** — the CNAME only works correctly once the stack is running.
5. Locate the Domain Name and CNAME value on the stack details page, and copy the CNAME.

## Configure DNS Records

Add a CNAME record with your DNS provider (e.g. Cloudflare):

| Setting | Value |
|---|---|
| Type | CNAME |
| Name | `@` for the root domain, or your subdomain (e.g. `www`) |
| Target | The CNAME value from mysabay.com (e.g. `abc123.sabay.com`) |
| Proxy status | DNS only (turn off the proxy / grey cloud in Cloudflare) |

After saving, the new CNAME record should appear in your DNS provider's management table.

**Wait for DNS propagation** — usually 5–30 minutes, though it can take up to 24 hours to fully propagate globally.

> **Next:** see [`03-managing-and-deleting.md`](./03-managing-and-deleting.md) to update or remove a stack.
