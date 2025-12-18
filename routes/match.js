const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.js");
const auth = require('../middlewares/auth');

router.get("/:id", matchController.getMatchById);

router.post("/", auth, matchController.createMatch);

router.put("/:id", auth, matchController.updateMatch);

router.delete("/:id", auth, matchController.deleteMatch);

module.exports = router;