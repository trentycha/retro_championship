const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.js");

// router.get("/", tournamentController.getAllTournaments);
router.get("/:id", tournamentController.getTournamentById);
// router.get("/:id/users", tournamentController.getAllUsersFromOneTournament);
// router.get("/:id/winner", tournamentController.getWinnerFromOneTournament);

router.post("/", tournamentController.createTournament);
// router.post("/:id/subscribe", tournamentController.subscribeToTournament);

router.put("/:id", tournamentController.updateTournament);

router.delete("/:id", tournamentController.deleteTournament);
// router.delete("/:id/user/:userId", tournamentController.unsubscribeFromTournament);

module.exports = router;