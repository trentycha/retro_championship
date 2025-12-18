const express = require("express");
const router = express.Router();
const prizeController = require("../controllers/prize.js");
const auth = require('../middlewares/auth');

router.get("/:id", prizeController.getPrizeById);

router.post("/", auth, prizeController.createPrize);

router.put("/:id", auth, prizeController.updatePrize);

router.delete("/:id", auth, prizeController.deletePrize);

module.exports = router;