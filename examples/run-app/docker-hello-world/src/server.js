const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const message = process.env.APP_MESSAGE || "Hello from Run App!";
const accentColor = process.env.APP_COLOR || "#2563eb";

// In-memory only — resets on restart/redeploy. A stand-in until a real
// database service is wired up; see examples/run-app/docker-hello-world/README.md.
let visitCount = 0;
const startedAt = Date.now();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({ message, accentColor });
});

app.get("/api/counter", (req, res) => {
  res.json({ count: visitCount });
});

app.post("/api/counter/increment", (req, res) => {
  visitCount += 1;
  res.json({ count: visitCount });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}, APP_MESSAGE="${message}"`);
});
