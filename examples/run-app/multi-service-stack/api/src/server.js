const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const items = [
  { id: 1, name: "First item" },
  { id: 2, name: "Second item" },
  { id: 3, name: "Third item" },
];

app.get("/api/items", (req, res) => {
  res.json({ items });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});
