const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const message = process.env.APP_MESSAGE || "Hello from Run App!";

app.get("/", (req, res) => {
  res.send(`<h1>${message}</h1>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}, APP_MESSAGE="${message}"`);
});
