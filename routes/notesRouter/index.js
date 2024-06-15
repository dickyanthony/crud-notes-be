const express = require("express");

const app = express();

const Notes = require("./notes");

const api = "/api/v1";

app.use(api, Notes);
module.exports = app;
