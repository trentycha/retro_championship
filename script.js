const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    await prisma.userStatus.createMany({
        data: [
            { label: 'Player' },
            { label: 'Admin' },
            { label: 'Super-admin' },
        ],
        skipDuplicates: true,
    });

    await prisma.license.createMany({
        data: [
            { name: 'Pacman' },
            { name: 'Tetris' },
            { name: 'Pong' },
            { name: 'Mario' },
        ],
        skipDuplicates: true,
    });

    await prisma.typeGame.createMany({
        data: [{ name: 'Fighting' }, { name: 'Score' }, { name: '1v1' }],
        skipDuplicates: true,
    });

    await prisma.matchStatus.createMany({
        data: [
            { label: 'En attente' },
            { label: 'En cours' },
            { label: 'Terminé' },
        ],
        skipDuplicates: true,
    });

    await prisma.tournamentStatus.createMany({
        data: [
            { label: 'En attente' },
            { label: 'En cours' },
            { label: 'Terminé' },
        ],
        skipDuplicates: true,
    });

    await prisma.channel.createMany({
        data: [
            { label: 'Link' },
            { label: 'Mario' },
            { label: 'Lara' },
            { label: 'Bowser' },
        ],
        skipDuplicates: true,
    });

    const licencePacman = await prisma.license.findFirst({
        where: { name: 'Pacman' },
    });
    const licenceMario = await prisma.license.findFirst({
        where: { name: 'Mario' },
    });
    const licencePong = await prisma.license.findFirst({
        where: { name: 'Pong' },
    });
    const typeScore = await prisma.typeGame.findFirst({
        where: { name: 'Score' },
    });
    const type1v1 = await prisma.typeGame.findFirst({ where: { name: '1v1' } });
    const channelLara = await prisma.channel.findFirst({
        where: { label: 'Lara' },
    });
    const channelMario = await prisma.channel.findFirst({
        where: { label: 'Mario' },
    });
    const channelLink = await prisma.channel.findFirst({
        where: { label: 'Link' },
    });
    const statusEnAttente = await prisma.tournamentStatus.findFirst({
        where: { label: 'En attente' },
    });
    const statusEnCours = await prisma.tournamentStatus.findFirst({
        where: { label: 'En cours' },
    });
    const matchStatusTermine = await prisma.matchStatus.findFirst({
        where: { label: 'Terminé' },
    });
    const userStatusPlayer = await prisma.userStatus.findFirst({
        where: { label: 'Player' },
    });

    const gamePacman = await prisma.game.create({
        data: {
            name: 'Pacman Score',
            licenseId: licencePacman.id,
            typeGameId: typeScore.id,
        },
    });

    const gameMario = await prisma.game.create({
        data: {
            name: 'Mario Score',
            licenseId: licenceMario.id,
            typeGameId: typeScore.id,
        },
    });

    const gamePong = await prisma.game.create({
        data: {
            name: 'Pong 1v1',
            licenseId: licencePong.id,
            typeGameId: type1v1.id,
        },
    });

    const hashedPassword = await bcrypt.hash('password123', 10);
    const players = [];

    for (let i = 1; i <= 12; i++) {
        const player = await prisma.user.create({
            data: {
                mail: `player${i}@retro.com`,
                password: hashedPassword,
                username: `player${i}`,
                birthday: new Date('1995-06-15'),
                city: 'Paris',
                createdAt: new Date(),
                userStatusId: userStatusPlayer.id,
            },
        });
        players.push(player);
    }

    const prize = await prisma.prize.create({
        data: {
            name: 'Prix Tournoi Hiver',
            description: "Prix du Tournoi d'hiver Pacman",
            value: 1000.0,
            userId: players[0].id,
        },
    });

    const tournoiPacman = await prisma.tournament.create({
        data: {
            name: "Tournoi d'hiver Pacman",
            startedAt: new Date('2025-01-10T10:00:00'),
            endedAt: new Date('2025-01-10T18:00:00'),
            creatorId: players[0].id,
            prizeId: prize.id,
            gameId: gamePacman.id,
            tournamentStatusId: statusEnCours.id,
            channelId: channelLara.id,
        },
    });

    await prisma.tournament.create({
        data: {
            name: 'Tournoi Mario Printemps',
            startedAt: new Date('2025-03-15T10:00:00'),
            endedAt: new Date('2025-03-15T17:00:00'),
            creatorId: players[0].id,
            gameId: gameMario.id,
            tournamentStatusId: statusEnAttente.id,
            channelId: channelMario.id,
        },
    });

    await prisma.tournament.create({
        data: {
            name: 'Tournoi Pong 1v1',
            startedAt: new Date('2025-07-20T14:00:00'),
            endedAt: new Date('2025-07-20T20:00:00'),
            creatorId: players[0].id,
            gameId: gamePong.id,
            tournamentStatusId: statusEnAttente.id,
            channelId: channelLink.id,
        },
    });

    const matchesData = [];
    for (let i = 0; i < 12; i++) {
        const player1 = players[i];
        const player2 = players[(i + 1) % 12];
        matchesData.push({
            startedAt: new Date(
                `2025-01-10T${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}:00`
            ),
            endedAt: new Date(
                `2025-01-10T${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '25' : '55'}:00`
            ),
            tournamentId: tournoiPacman.id,
            winnerId: player1.id,
            channelId: channelLara.id,
            player1Id: player1.id,
            player2Id: player2.id,
            matchStatusId: matchStatusTermine.id,
        });
    }

    await prisma.match.createMany({ data: matchesData });
    console.log('Ok !');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
