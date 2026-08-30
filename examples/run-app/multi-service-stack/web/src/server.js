const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || "http://localhost:4000";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/api/items`);
    const data = await response.json();
    const listItems = data.items.map((item) => `<li>${item.name}</li>`).join("");
    res.send(`<h1>Items from the api service</h1><ul>${listItems}</ul>`);
  } catch (err) {
    res.status(502).send(`Could not reach api service at ${apiUrl}: ${err.message}`);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`web listening on port ${port}, API_URL="${apiUrl}"`);
});
