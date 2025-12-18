const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/user", userRoutes);
app.use("/api/tournament", tournamentRoutes);
app.use("/api/match", matchesRoutes);
app.use("/api/prize", prizeRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/game", gameRoutes);

module.exports = app;