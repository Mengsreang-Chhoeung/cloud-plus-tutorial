# storage-hello

A small Express app demonstrating S3-compatible upload, list, download, and delete against a Sabay Cloud+ Storage bucket. It has an upload form, a file list, and a health endpoint.

It reads these environment variables:

- `PORT` — port to listen on (default `3000`)
- `STORAGE_ENDPOINT` — S3 API endpoint (default `https://fsgw.sabay.com`)
- `STORAGE_ACCESS_KEY` — your bucket's Access Key, from the Bucket List tab (required, no default)
- `STORAGE_SECRET_KEY` — your bucket's Secret Key, from the Bucket List tab (required, no default)
- `STORAGE_BUCKET_NAME` — your bucket's name, from the Bucket Information step (required, no default)
- `STORAGE_REGION` — S3 region string (default `us-east-1`); Cloud+ Storage ignores the value, but the AWS SDK requires one
- `STORAGE_FORCE_PATH_STYLE` — set to `false` to use virtual-hosted-style addressing instead of the default path-style (default `true`, matching the `<endpoint>/<bucket-name>` URL shape)

See [`../../docs/storage/01-getting-started.md`](../../docs/storage/01-getting-started.md) and [`../../docs/storage/02-managing-and-deleting.md`](../../docs/storage/02-managing-and-deleting.md) for how to create a bucket and find your Access Key / Secret Key.

## Routes

- `GET /` — the frontend (`public/index.html`)
- `POST /api/objects` — uploads a file (multipart field `file`), returns `{ key, size }`
- `GET /api/objects` — lists bucket contents, returns `{ objects: [{ key, size, lastModified }] }`
- `GET /api/objects/:key` — downloads an object
- `DELETE /api/objects/:key` — deletes an object, returns `{ deleted: key }`
- `GET /health` — returns `{ status, uptimeSeconds }`

This is a teaching example — no auth, no request validation beyond Express/multer defaults, no retry logic. It's not a template for a production upload service.

## Run locally (no Docker)

```bash
nvm use && npm install
STORAGE_ACCESS_KEY="your-access-key" \
STORAGE_SECRET_KEY="your-secret-key" \
STORAGE_BUCKET_NAME="your-bucket-name" \
npm run dev
```

Visit http://localhost:3000, upload a file, then download or delete it from the list.

## Run with Docker

```bash
docker build -t storage-hello .
docker run -p 3000:3000 \
  -e STORAGE_ACCESS_KEY="your-access-key" \
  -e STORAGE_SECRET_KEY="your-secret-key" \
  -e STORAGE_BUCKET_NAME="your-bucket-name" \
  storage-hello
```

Visit http://localhost:3000 to confirm it works the same way containerized.

## Deploy to Run App

1. Build for `linux/amd64` and push to a container registry — Run App currently only supports that platform.

   ```bash
   docker login

   docker buildx build --platform linux/amd64 \
     -t <your-dockerhub-username>/storage-hello:latest \
     --push .
   ```

2. Follow [`../../docs/run-app/01-getting-started.md`](../../docs/run-app/01-getting-started.md) to create a stack from that image (`<your-dockerhub-username>/storage-hello:latest`), setting `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY`, and `STORAGE_BUCKET_NAME` as Share Env keys.
3. Optionally continue with [`02-domain-setup.md`](../../docs/run-app/02-domain-setup.md) to attach a custom domain.
