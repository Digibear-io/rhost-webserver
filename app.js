const express = require("express");
const config = require("./src/config");
const app = express();

// Middleware
app.use(require("helmet")());
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

app.use(
  "/api/v1/trello/",
  require("./src/middleware/boardinfo"),
  require("./src/routes/trello")
);

// Start the HTTP server!
app.listen(config.httpServer.port, () =>
  console.log("HTTP Server started on port: ", config.httpServer.port)
);
