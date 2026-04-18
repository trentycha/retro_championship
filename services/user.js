const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const { signupSchema, loginSchema, updateUserSchema } = require('../validators/user');

exports.getUserById = async (id) => {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { userStatus: true }
    });

    if (!user) {
        throw new Error("Utilisateur introuvable.");
    }

    return user;
};

exports.signup = async ({ mail, password, username, birthday, city, userStatus }) => {

    signupSchema.parse({ mail, password, username, birthday, city, userStatus });

    const checkMail = await prisma.user.findUnique({
        where: { mail },
    });

    if (checkMail) {
        throw new Error("Un autre compte possède déjà ce mail");
    }

    const checkUsername = await prisma.user.findUnique({
        where: { username },
    });
    if (checkUsername) {
        throw new Error("Un autre compte possède déjà ce pseudo");
    }

    const checkStatus = await prisma.userStatus.findFirst({
        where: { label: userStatus },
    });
    if (!checkStatus) {
        throw new Error("Mauvais statut défini");
    }

    const salt = await bcrypt.genSalt(10);
    const crypted_password = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            mail,
            password: crypted_password,
            username,
            birthday: new Date(birthday),
            city,
            userStatusId: checkStatus.id,
            createdAt: new Date(),
            howManyTourn: 0,
            howManyMatches: 0,
            wonTournaments: 0,
        },
    });

    return newUser;
};

exports.login = async ({ mail, password }) => {

    loginSchema.parse({ mail, password });

    const user = await prisma.user.findUnique({
        where: { mail },
    });

    if (!user) {
        throw new Error("Utilisateur introuvable.");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        throw new Error("Mot de passe incorrect !");
    }

    return user;
};

exports.updateUser = async (id, { mail, password, username, birthday, city, userStatus }) => {

    updateUserSchema.parse({ mail, password, username, birthday, city, userStatus });

    const checkStatus = await prisma.userStatus.findFirst({
        where: { label: userStatus },
    });

    if (!checkStatus) {
        throw new Error("Mauvais statut défini");
    }

    const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    if (!existingUser) {
        throw new Error("Utilisateur introuvable.");
    }

    const checkMail = await prisma.user.findFirst({
        where: { mail, NOT: { id: parseInt(id) } },
    });
    if (checkMail) {
        throw new Error("Un autre compte possède déjà ce mail.");
    }

    const checkUsername = await prisma.user.findFirst({
        where: { username, NOT: { id: parseInt(id) } },
    });
    if (checkUsername) {
        throw new Error("Un autre compte possède déjà ce pseudo.");
    }

    const salt = await bcrypt.genSalt(10);
    const crypted_password = await bcrypt.hash(password, salt);

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            mail,
            password: crypted_password,
            username,
            birthday: new Date(birthday),
            city,
            userStatusId: checkStatus.id,
        },
    });

    return { updatedUser, checkStatus };
};

exports.deleteUser = async (id) => {

    const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    });
    if (!user) {
        throw new Error("Utilisateur introuvable.");
    }

    await prisma.user.delete({
        where: { id: parseInt(id) },
    });

};

exports.getUserMatches = async (id) => {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    if (!user) {
        throw new Error("Utilisateur introuvable.");
    }

    const matches = await prisma.match.findMany({
        where: {
            OR: [
                { player1Id: parseInt(id) },
                { player2Id: parseInt(id) },
            ],
        },
        include: {
            player1: {
                select: { id: true, username: true },
            },
            player2: {
                select: { id: true, username: true },
            },
            winner: {
                select: { id: true, username: true },
            },
            tournament: {
                select: { id: true, name: true },
            },
        },
    });

    return matches;
};

exports.getUserTournaments = async (id) => {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    if (!user) {
        throw new Error("Utilisateur introuvable.");
    }

    const tournaments = await prisma.sub.findMany({
        where: {
            userId: parseInt(id),
        },
        include: {
            tournament: {
                select: {
                    name: true,
                    startedAt: true,
                    endedAt: true,
                    game: {
                        select: { id: true, name: true },
                    },
                    winner: {
                        select: { id: true, username: true },
                    },
                    prize: {
                        select: { id: true, name: true, value: true },
                    },
                    tournamentStatus: {
                        select: { id: true, label: true },
                    },
                },
            },
        },
    });

    return tournaments;
};