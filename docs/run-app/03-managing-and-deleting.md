# Managing and Deleting a Stack

## Updating a stack

1. Click the ellipsis (three dots) menu on your stack.
2. Click **Edit**, change whatever fields you need (including domain — see [`02-domain-setup.md`](./02-domain-setup.md)).
3. Click **Update** or **Pull & Update** to redeploy with your changes.

## Checking stack state

Open a stack to view its details. Its state must be **Running** for features like the domain/CNAME to work correctly — if DNS or your app isn't behaving as expected, check this first.

Each service's own **Service Info** tab (in the deployed stack view) shows:

- **Container Image**, **Restart Policy**, and **Resource** — read-only mirrors of what was set when creating/editing the service (see [`01-getting-started.md`](./01-getting-started.md))
- **Host Name** — the domain you assigned this service
- **Domain Generate** — an auto-assigned `*.sabay.com` subdomain for this service
- **Service Network** — an internal Docker network name for this service, formatted `uid-<account-uid>-cca-<stack-name>_<service-name>` (e.g. `uid-39789111-cca-run-app-hello_ui`). Other services in the **same stack** can reach this one directly over this internal network at `http://<service-network-value>:<container-port>`, without going through a public domain. This is how [`multi-service-stack`](../../examples/run-app/multi-service-stack/) wires its `web` service to `api` — see that example's README for the exact steps.

Start/Stop/Restart controls for the service are also available from this view.

## Delete Run App

1. Click the ellipsis (meatballs menu) on the stack you want to remove, then click **Remove**.
2. A confirmation pop-up will ask you to confirm the deletion.
3. Once confirmed, the stack processes deletion; completion is shown via a pop-up in the corner of the screen.
