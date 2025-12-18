const { prisma } = require('../lib/prisma');

exports.getMatchById = async (req, res, next) => {

            try {
                const match = await prisma.match.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                res.status(200).json(match);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.createMatch = async (req, res, next) => {

    try {
        const { startedAt, endedAt, firstPlayer, secondPlayer, winner, channel, tournament, matchStatus } = req.body;

        const firstPlayerMatch = await prisma.user.findFirst({
            where: { username: firstPlayer },
        });
        if (!firstPlayerMatch) {
            return res.status(400).json( {j1 : "Pas de joueur trouvé"});
        }

        const secondPlayerMatch = await prisma.user.findFirst({
            where: { username: secondPlayer },
        });
        if (!secondPlayerMatch) {
            return res.status(400).json( {j2 : "Pas de joueur trouvé"});
        }

        const channelMatch = await prisma.channel.findFirst({
            where: { label: channel },
        });
        if (!channelMatch) {
            return res.status(400).json( {channel : "Pas de room trouvé"});
        }

        const tournamentMatch = await prisma.tournament.findFirst({
            where: { name: tournament },
        });
        if (!tournamentMatch) {
            return res.status(400).json( {tournamentMatch : "Pas de tournoi trouvé"});
        }

        const status = await prisma.matchStatus.findFirst({
            where: { label: matchStatus },
        });
        if (!status) {
            return res.status(400).json( {matchStatus : "Mauvais statut défini"});
        }

        const newMatch = await prisma.match.create({
            data: {
            startedAt: new Date(startedAt),
            endedAt: null,
            player1Id: firstPlayerMatch.id,
            player2Id: secondPlayerMatch.id,
            channelId: channelMatch.id,
            tournamentId: tournamentMatch.id,
            winnerId: null,
            matchStatusId: status.id,
            },
        })
        res.status(201).json(newMatch)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.updateMatch = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { startedAt, endedAt, firstPlayer, secondPlayer, winner, channel, tournament, matchStatus } = req.body;

        const firstPlayerMatch = await prisma.user.findFirst({
            where: { username: firstPlayer },
        });
        if (!firstPlayerMatch) {
            return res.status(400).json( {j1 : "Pas de joueur trouvé"});
        }

        const secondPlayerMatch = await prisma.user.findFirst({
            where: { username: secondPlayer },
        });
        if (!secondPlayerMatch) {
            return res.status(400).json( {j2 : "Pas de joueur trouvé"});
        }

        const channelMatch = await prisma.channel.findFirst({
            where: { label: channel },
        });
        if (!channelMatch) {
            return res.status(400).json( {channel : "Pas de room trouvé"});
        }

        const tournamentMatch = await prisma.tournament.findFirst({
            where: { name: tournament },
        });
        if (!tournamentMatch) {
            return res.status(400).json( {tournamentMatch : "Pas de tournoi trouvé"});
        }

        const status = await prisma.matchStatus.findFirst({
            where: { label: matchStatus },
        });
        if (!status) {
            return res.status(400).json( {matchStatus : "Mauvais statut défini"});
        }

        const updateMatch = await prisma.match.update({
            where: { id: parseInt(id) },
            data: {
            startedAt: new Date(startedAt),
            endedAt: null,
            player1Id: firstPlayerMatch.id,
            player2Id: secondPlayerMatch.id,
            channelId: channelMatch.id,
            tournamentId: tournamentMatch.id,
            winnerId: null,
            matchStatusId: status.id,
            },
        })
        res.status(200).json(updateMatch)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.deleteMatch = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMatch = await prisma.match.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({message: "Match supprimé !"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};