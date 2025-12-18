const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.js");
const auth = require('../middlewares/auth');

router.get("/", gameController.getAllGame);

router.post("/", auth, gameController.createGame);

router.get("/:id", auth, gameController.getGameById);

router.put("/:id", auth, gameController.updateGame);

router.delete("/:id", auth, gameController.deleteGame);

module.exports = router;