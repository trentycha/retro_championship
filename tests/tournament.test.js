const tournamentService = require('../services/tournament');
const { prisma } = require('../lib/prisma');

jest.mock('../lib/prisma', () => ({

    prisma: {
        tournament: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
        },
        game: {
            findFirst: jest.fn(),
        },
        user: {
            findFirst: jest.fn(),
        },
        tournamentStatus: {
            findFirst: jest.fn(),
        },
    },

}));

describe('tournamentService.createTournament', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('créer un tournoi avec succès', async () => {

        prisma.tournament.findUnique.mockResolvedValue(null);
        prisma.game.findFirst.mockResolvedValue({ id: 1, name: 'Pac-Man' });
        prisma.user.findFirst.mockResolvedValue({ id: 1, username: 'testuser' });
        prisma.tournamentStatus.findFirst.mockResolvedValue({ id: 1, label: 'En cours' });
        prisma.tournament.create.mockResolvedValue({
            id: 1,
            name: 'Tournoi Pac-Man',
            startedAt: new Date('2024-06-01'),
            endedAt: new Date('2024-06-30'),
            gameId: 1,
            creatorId: 1,
            winnerId: null,
            prizeId: null,
            tournamentStatusId: 1,
        });

        const result = await tournamentService.createTournament({
            name: 'Tournoi Pac-Man',
            startedAt: '2024-06-01',
            endedAt: '2024-06-30',
            game: 'Pac-Man',
            creator: 'testuser',
            tournamentStatus: 'En cours',
        });

        expect(result.name).toBe('Tournoi Pac-Man');
        expect(result.gameId).toBe(1);
    });

    it('lève une erreur si le nom du tournoi est déjà pris', async () => {

        prisma.tournament.findUnique.mockResolvedValue({ id: 1, name: 'Tournoi Pac-Man' });

        await expect(tournamentService.createTournament({
            name: 'Tournoi Pac-Man',
            startedAt: '2024-06-01',
            endedAt: '2024-06-30',
            game: 'Pac-Man',
            creator: 'testuser',
            tournamentStatus: 'En cours',
        })).rejects.toThrow('Un tournoi avec ce nom existe déjà.');
    });

    it('lève une erreur si le jeu est introuvable', async () => {

        prisma.tournament.findUnique.mockResolvedValue(null);
        prisma.game.findFirst.mockResolvedValue(null);

        await expect(tournamentService.createTournament({
            name: 'Tournoi Pac-Man',
            startedAt: '2024-06-01',
            endedAt: '2024-06-30',
            game: 'JeuInexistant',
            creator: 'testuser',
            tournamentStatus: 'En cours',
        })).rejects.toThrow('Jeu introuvable.');
    });

});