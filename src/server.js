const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

const APS_CLIENT_ID = "VQ3f8UjIAGokGQtGFCw5AMjWp0WNM7N9k22MeF5059K5EYuG";
const APS_CLIENT_SECRET =
  "9CX4m9i3FIyvzFwjLXwwtC2tn0DSbVAS2NYEp8dA6nZBlOSOMOlLwoYYmdZOnUTS";

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
