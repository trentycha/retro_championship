const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const auth = require('../middlewares/auth');

router.get("/:id", userController.getUserById);

router.post("/register", userController.signup);
router.post("/login", userController.login);

router.get("/:id/matches", userController.getUserMatches);
router.get("/:id/tournaments", userController.getUserTournaments);

router.put("/:id", auth, userController.updateUser);

router.delete("/:id", auth, userController.deleteUser);

module.exports = router;