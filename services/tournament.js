const { prisma } = require('../lib/prisma');
const { createTournamentSchema, updateTournamentSchema } = require('../validators/tournament');

exports.getAllTournaments = async () => {

    const tournaments = await prisma.tournament.findMany({
        include: {
            tournamentStatus: true,
            creator: true,
            winner: true,
            prize: true,
            game: true,
            channel: true
        }
    });

    return tournaments;
};

exports.getTournamentById = async (id) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
        include: {
            tournamentStatus: true,
            creator: true,
            winner: true,
            prize: true,
            game: true,
            channel: true
        }
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    return tournament;
};

exports.createTournament = async ({ name, startedAt, endedAt, game, creator, tournamentStatus, prizeId, channelId }) => {

    createTournamentSchema.parse({ name, startedAt, endedAt, game, creator, tournamentStatus});

    const checkName = await prisma.tournament.findUnique({
        where: { name },
    });

    if (checkName) {
        throw new Error("Un tournoi avec ce nom existe déjà.");
    }

    const checkGame = await prisma.game.findFirst({
        where: { name: game },
    });

    if (!checkGame) {
        throw new Error("Jeu introuvable.");
    }

    const checkCreator = await prisma.user.findFirst({
        where: { username: creator },
    });

    if (!checkCreator) {
        throw new Error("Créateur introuvable.");
    }

    const checkStatus = await prisma.tournamentStatus.findFirst({
        where: { label: tournamentStatus },
    });

    if (!checkStatus) {
        throw new Error("Statut de tournoi introuvable.");
    }

    const newTournament = await prisma.tournament.create({
        data: {
            name,
            startedAt: new Date(startedAt),
            endedAt: new Date(endedAt),
            gameId: checkGame.id,
            creatorId: checkCreator.id,
            winnerId: null,
            prizeId: prizeId,
            tournamentStatusId: checkStatus.id,
            channelId: channelId,
        },
    });

    return newTournament;
};

exports.updateTournament = async (id, { name, startedAt, endedAt, game, creator, tournamentStatus }) => {

    updateTournamentSchema.parse({ name, startedAt, endedAt, game, creator, tournamentStatus });

    const existingTournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingTournament) {
        throw new Error("Tournoi introuvable.");
    }

    const checkName = await prisma.tournament.findFirst({
        where: { name, NOT: { id: parseInt(id) } },
    });

    if (checkName) {
        throw new Error("Un tournoi avec ce nom existe déjà.");
    }

    const checkGame = await prisma.game.findFirst({
        where: { name: game },
    });

    if (!checkGame) {
        throw new Error("Jeu introuvable.");
    }

    const checkCreator = await prisma.user.findFirst({
        where: { username: creator },
    });

    if (!checkCreator) {
        throw new Error("Créateur introuvable.");
    }

    const checkStatus = await prisma.tournamentStatus.findFirst({
        where: { label: tournamentStatus },
    });

    if (!checkStatus) {
        throw new Error("Statut de tournoi introuvable.");
    }

    const updatedTournament = await prisma.tournament.update({
        where: { id: parseInt(id) },
        data: {
            name,
            startedAt: new Date(startedAt),
            endedAt: new Date(endedAt),
            gameId: checkGame.id,
            creatorId: checkCreator.id,
            winnerId: null,
            prizeId: null,
            tournamentStatusId: checkStatus.id,
        },
    });

    return updatedTournament;
};

exports.deleteTournament = async (id) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    await prisma.tournament.delete({
        where: { id: parseInt(id) },
    });
};

exports.getAllMatchesFromOneTournament = async (id) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    const matches = await prisma.match.findMany({
        where: { tournamentId: parseInt(id) },
        include: {
            player1: {
                select: { username: true, mail: true },
            },
            player2: {
                select: { username: true, mail: true },
            },
            winner: {
                select: { username: true },
            },
            channel: {
                select: { label: true },
            },
            matchStatus: {
                select: { label: true },
            },
            roundMatch: {
                select: { id: true, label: true },
            },
        },
    });

    return matches;
};

exports.getAllUsersFromOneTournament = async (id) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    const subscriptions = await prisma.sub.findMany({
        where: { tournamentId: parseInt(id) },
        include: {
            user: {
                select: { username: true, mail: true },
            },
        },
    });

    return subscriptions;
};

exports.getWinnerFromOneTournament = async (id) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    const winner = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
        select: {
            winner: {
                select: { username: true, mail: true },
            },
        },
    });

    return winner;
};

exports.subscribeToTournament = async (id, userId) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    const existingSub = await prisma.sub.findUnique({
        where: {
            userId_tournamentId: {
                userId,
                tournamentId: parseInt(id),
            },
        },
    });

    if (existingSub) {
        throw new Error("L'utilisateur est déjà inscrit à ce tournoi.");
    }

    const subscription = await prisma.sub.create({
        data: {
            userId,
            tournamentId: parseInt(id),
        },
    });

    return subscription;
};

exports.unsubscribeFromTournament = async (id, userId) => {

    const tournament = await prisma.tournament.findUnique({
        where: { id: parseInt(id) },
    });

    if (!tournament) {
        throw new Error("Tournoi introuvable.");
    }

    const existingSub = await prisma.sub.findUnique({
        where: {
            userId_tournamentId: {
                userId,
                tournamentId: parseInt(id),
            },
        },
    });

    if (!existingSub) {
        throw new Error("L'utilisateur n'est pas inscrit à ce tournoi.");
    }

    await prisma.sub.delete({
        where: {
            userId_tournamentId: {
                userId,
                tournamentId: parseInt(id),
            },
        },
    });
};