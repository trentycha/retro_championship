const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const userRoutes = require("./routes/user.js");
const tournamentRoutes = require("./routes/tournament.js");
const matchesRoutes = require("./routes/match.js");
const prizeRoutes = require("./routes/prize.js");
const channelRoutes = require("./routes/channel.js");
const gameRoutes = require("./routes/game.js");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use("/api/user", userRoutes);
app.use("/api/tournament", tournamentRoutes);
app.use("/api/match", matchesRoutes);
app.use("/api/prize", prizeRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/game", gameRoutes);

module.exports = app;