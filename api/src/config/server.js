// import express & global middlewares
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require("../middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");


// import router
const apiRouter = require("../modules");

// Instanciate your app (http server)
const app = express();

app.use(express.static(path.join(__dirname + "/../../../front/dist")));
// apply global middlewares (!important: before any routes !)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// link router to your app
app.use("/api", apiRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../../../front/dist/index.html"));
});

// global error handler middleware
app.use(errorHandler);

module.exports = app;