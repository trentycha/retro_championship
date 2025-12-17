const express = require('express');
const cors = require('cors');

const app = express();

const userRoutes = require("./routes/user.js");
const tournamentRoutes = require("./routes/tournament.js");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/tournament", tournamentRoutes);

module.exports = app;