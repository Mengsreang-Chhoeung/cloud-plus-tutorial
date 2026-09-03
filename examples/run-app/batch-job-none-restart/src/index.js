const http = require("http");

const port = process.env.PORT || 3000;
const jobName = process.env.JOB_NAME || "demo-migration";
const workSeconds = Number(process.env.WORK_SECONDS || 10);
const shouldFail = process.env.FAIL === "true";

let status = "running";
const startedAt = Date.now();

// Container Port needs something listening so the stack has a status to
// check via its domain/port before the job exits — see README.md.
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      job: jobName,
      status,
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    })
  );
});

server.listen(port, () => {
  console.log(`[${jobName}] listening on port ${port}, working for ${workSeconds}s`);
});

setTimeout(() => {
  if (shouldFail) {
    console.error(`[${jobName}] failed`);
    status = "failed";
    process.exitCode = 1;
    server.close(() => process.exit(1));
    return;
  }

  console.log(`[${jobName}] done`);
  status = "done";
  server.close(() => process.exit(0));
}, workSeconds * 1000);
