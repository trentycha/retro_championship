const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.js");
const auth = require('../middlewares/auth');

router.get("/", tournamentController.getAllTournaments);
router.get("/:id", tournamentController.getTournamentById);
// router.get("/:id/matches", tournamentController.getAllMatchesFromOneTournament);
router.get("/:id/users", tournamentController.getAllUsersFromOneTournament);
router.get("/:id/winner", tournamentController.getWinnerFromOneTournament);

router.post("/", auth, tournamentController.createTournament);
// router.post("/:id/subscribe", tournamentController.subscribeToTournament);

router.put("/:id", auth, tournamentController.updateTournament);

router.delete("/:id", auth, tournamentController.deleteTournament);
// router.delete("/:id/user/:userId", tournamentController.unsubscribeFromTournament);

module.exports = router;