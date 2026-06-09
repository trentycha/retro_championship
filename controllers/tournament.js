const tournamentService = require('../services/tournament');

exports.getAllTournaments = async (req, res) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await tournamentService.getTournamentById(
            req.params.id
        );
        res.status(200).json(tournament);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createTournament = async (req, res) => {
    try {
        const newTournament = await tournamentService.createTournament(
            req.body
        );
        res.status(201).json(newTournament);
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues[0].message });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.updateTournament = async (req, res) => {
    try {
        const updatedTournament = await tournamentService.updateTournament(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedTournament);
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues[0].message });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTournament = async (req, res) => {
    try {
        await tournamentService.deleteTournament(req.params.id);
        res.status(204).json({ message: 'Tournoi supprimé !' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getAllMatchesFromOneTournament = async (req, res) => {
    try {
        const matches = await tournamentService.getAllMatchesFromOneTournament(
            req.params.id
        );
        res.status(200).json(matches);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getAllUsersFromOneTournament = async (req, res) => {
    try {
        const subscriptions =
            await tournamentService.getAllUsersFromOneTournament(req.params.id);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getWinnerFromOneTournament = async (req, res) => {
    try {
        const winner = await tournamentService.getWinnerFromOneTournament(
            req.params.id
        );
        res.status(200).json(winner);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.subscribeToTournament = async (req, res) => {
    try {
        const subscription = await tournamentService.subscribeToTournament(
            req.params.id,
            req.auth.userId
        );
        res.status(201).json(subscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.unsubscribeFromTournament = async (req, res) => {
    try {
        await tournamentService.unsubscribeFromTournament(
            req.params.id,
            req.auth.userId
        );
        res.status(204).json({ message: 'Inscription supprimée !' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
