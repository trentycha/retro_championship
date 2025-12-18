const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channel.js");
const auth = require('../middlewares/auth');

router.get("/", channelController.getAllChannel);

router.post("/", auth, channelController.createChannel);

router.get("/:id", auth, channelController.getChannelById);

router.put("/:id", auth, channelController.updateChannel);

router.delete("/:id", auth, channelController.deleteChannel);

module.exports = router;