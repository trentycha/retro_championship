const userService = require('../services/user');
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');

jest.mock('../lib/prisma', () => ({

    prisma: {
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
        },
        userStatus: {
            findFirst: jest.fn(),
        },
    },

}));

jest.mock('bcrypt');

describe('userService.signup', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('devrait créer un utilisateur avec succès', async () => {

        prisma.user.findUnique.mockResolvedValue(null);
        prisma.userStatus.findFirst.mockResolvedValue({ id: 1, label: 'joueur' });
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashed_password');
        prisma.user.create.mockResolvedValue({
            id: 1,
            mail: 'test@test.com',
            username: 'testuser',
            birthday: new Date('1997-06-19'),
            city: 'Paris',
            userStatusId: 1,
        });

        const result = await userService.signup({
            mail: 'test@test.com',
            password: '12345678',
            username: 'testuser',
            birthday: '1997-06-19',
            city: 'Paris',
            userStatus: 'joueur',
        });

        expect(result.mail).toBe('test@test.com');
        expect(result.username).toBe('testuser');
    });

    it('devrait lever une erreur si le mail est déjà pris', async () => {
        prisma.user.findUnique.mockResolvedValueOnce({ id: 1, mail: 'test@test.com' });

        await expect(userService.signup({
            mail: 'test@test.com',
            password: '12345678',
            username: 'testuser',
            birthday: '1997-06-19',
            city: 'Paris',
            userStatus: 'joueur',
        })).rejects.toThrow('Un autre compte possède déjà ce mail');
    });

    it('devrait lever une erreur si le username est déjà pris', async () => {
        prisma.user.findUnique
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ id: 2, username: 'testuser' });

        await expect(userService.signup({
            mail: 'test@test.com',
            password: '12345678',
            username: 'testuser',
            birthday: '1997-06-19',
            city: 'Paris',
            userStatus: 'joueur',
        })).rejects.toThrow('Un autre compte possède déjà ce pseudo');
    });

});