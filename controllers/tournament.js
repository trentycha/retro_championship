const { prisma } = require('../lib/prisma');

exports.getAllTournaments = async (req, res, next) => {

            try {
                const user = await prisma.tournament.findMany();
                res.status(200).json(user);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.getTournamentById = async (req, res, next) => {

            try {
                const tournament = await prisma.tournament.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                res.status(200).json(tournament);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.createTournament = async (req, res, next) => {

    try {
        const { name, startedAt, endedAt, game, creator, tournamentStatus } = req.body;

        const gameTournament = await prisma.game.findFirst({
            where: { name: game },
        });
        if (!gameTournament) {
            return res.status(400).json( {game : "Mauvais statut défini"});
        }

        const creatorTournament = await prisma.user.findFirst({
            where: { username: creator },
        });
        if (!creatorTournament) {
            return res.status(400).json( {creator : "Mauvais statut défini"});
        }

        const status = await prisma.tournamentStatus.findFirst({
            where: { label: tournamentStatus },
        });
        if (!status) {
            return res.status(400).json( {tournamentStatus : "Mauvais statut défini"});
        }

        const newTournament = await prisma.tournament.create({
            data: {
            name,
            startedAt: new Date(startedAt),
            endedAt: new Date(endedAt),
            gameId: gameTournament.id,
            creatorId: creatorTournament.id,
            winnerId: null,
            prizeId: null,
            tournamentStatusId: status.id,
            },
        })
        res.status(201).json(newTournament)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.updateTournament = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { name, startedAt, endedAt, game, creator, tournamentStatus } = req.body;

        const gameUpdate = await prisma.game.findFirst({
            where: { name: game },
        });
        if (!gameUpdate) {
            return res.status(400).json( {game : "Mauvais statut défini"});
        }

        const creatorUpdate = await prisma.user.findFirst({
            where: { username: creator },
        });
        if (!creatorUpdate) {
            return res.status(400).json( {creator : "Mauvais statut défini"});
        }

        const statusUpdate = await prisma.tournamentStatus.findFirst({
            where: { label: tournamentStatus },
        });
        if (!statusUpdate) {
            return res.status(400).json( {tournamentStatus : "Mauvais statut défini"});
        }

        const updateTournament = await prisma.tournament.update({
            where: { id: parseInt(id) },
            data: {
                name,
                startedAt: new Date(startedAt),
                endedAt: new Date(endedAt),
                gameId: gameUpdate.id,
                creatorId: creatorUpdate.id,
                winnerId: null,
                prizeId: null,
                tournamentStatusId: statusUpdate.id,
            },
        });
        res.status(200).json(updateTournament)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.deleteTournament = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedTournament = await prisma.tournament.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({message: "Tournoi supprimé !"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsersFromOneTournament = async (req, res, next) => {
    try {
        const { id } = req.params;

        const subscriptions = await prisma.sub.findMany({
            where: {
                tournamentId: parseInt(id),
            },
            include: {
                user: {
                    select: { username: true, mail: true },
                },
            },
        });

        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ usersFromTournament: error.message });
    }
};

exports.getWinnerFromOneTournament = async (req, res, next) => {
    try {
        const { id } = req.params;
        const winnerTournament = await prisma.tournament.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                winner: {
                    select: { username: true, mail: true },
                },
            },
        });

        res.json(winnerTournament);
    } catch (error) {
        res.status(500).json({ winnerTournament: error.message });
    }
};