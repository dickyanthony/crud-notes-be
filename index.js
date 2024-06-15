const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const notesRoute = require("./routes/notesRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.APP_PORT;
const server = createServer(app);

app.use(bodyParser.json());

app.use(notesRoute);

app.use("/config", (_, res) => {
  return res.send("Server already running!");
});

server.listen(PORT, () =>
  console.log(`server are running in http://localhost:${PORT}`)
);
