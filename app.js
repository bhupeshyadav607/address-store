const express = require("express");
const app = express();
const path = require("path");

//Mongo Connection:
const connectDB = require("./config/db");
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.send("Welcome to address store");
});

//Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`LISTENING on PORT ${port}`);
});
