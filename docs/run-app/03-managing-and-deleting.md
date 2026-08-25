# Managing and Deleting a Stack

## Updating a stack

1. Click the ellipsis (three dots) menu on your stack.
2. Click **Edit**, change whatever fields you need (including domain — see [`02-domain-setup.md`](./02-domain-setup.md)).
3. Click **Update** or **Pull & Update** to redeploy with your changes.

## Checking stack state

Open a stack to view its details. Its state must be **Running** for features like the domain/CNAME to work correctly — if DNS or your app isn't behaving as expected, check this first.

## Delete Run App

1. Click the ellipsis (meatballs menu) on the stack you want to remove, then click **Remove**.
2. A confirmation pop-up will ask you to confirm the deletion.
3. Once confirmed, the stack processes deletion; completion is shown via a pop-up in the corner of the screen.
