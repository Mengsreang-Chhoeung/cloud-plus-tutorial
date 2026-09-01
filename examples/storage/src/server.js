const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const app = express();
const port = process.env.PORT || 3000;
const startedAt = Date.now();

const endpoint = process.env.STORAGE_ENDPOINT || "https://fsgw.sabay.com";
const accessKeyId = process.env.STORAGE_ACCESS_KEY;
const secretAccessKey = process.env.STORAGE_SECRET_KEY;
const bucket = process.env.STORAGE_BUCKET_NAME;
// The SDK requires a region even though Cloud+ Storage ignores it.
const region = process.env.STORAGE_REGION || "us-east-1";
const forcePathStyle = process.env.STORAGE_FORCE_PATH_STYLE !== "false";

const missing = ["STORAGE_ACCESS_KEY", "STORAGE_SECRET_KEY", "STORAGE_BUCKET_NAME"].filter(
  (name) => !process.env[name]
);
if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(", ")}`);
  process.exit(1);
}

const s3 = new S3Client({
  endpoint,
  region,
  forcePathStyle,
  credentials: { accessKeyId, secretAccessKey },
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.post("/api/objects", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded (expected field \"file\")" });
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    })
  );

  res.json({ key: req.file.originalname, size: req.file.size });
});

app.get("/api/objects", async (req, res) => {
  const result = await s3.send(new ListObjectsV2Command({ Bucket: bucket }));

  res.json({
    objects: (result.Contents || []).map((obj) => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
    })),
  });
});

app.get("/api/objects/*", async (req, res) => {
  const key = req.params[0];

  try {
    const result = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    res.setHeader("Content-Disposition", `attachment; filename="${key}"`);
    if (result.ContentType) res.setHeader("Content-Type", result.ContentType);
    result.Body.pipe(res);
  } catch (err) {
    res.status(404).json({ error: `Object not found: ${key}` });
  }
});

app.delete("/api/objects/*", async (req, res) => {
  const key = req.params[0];

  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

  res.json({ deleted: key });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}, bucket "${bucket}" via ${endpoint}`);
});
