require('dotenv').config();
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserById = async (req, res, next) => {

            try {
                const user = await prisma.user.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                res.status(200).json(user);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.signup = async (req, res, next) => {

    try {
        const { mail, password, username, birthday, city, userStatus } = req.body;

        const salt = await bcrypt.genSalt(10)
        const crypted_password = await bcrypt.hash(req.body.password, salt)

        const verifMail = await prisma.user.findUnique({
            where: {mail},
        });
        if(verifMail) {
            return res.status(400).json( {mail : error.message});
        }

        const verifUsername = await prisma.user.findUnique({
            where: {username},
        });
        if(verifUsername) {
            return res.status(400).json( {username : error.message});
        }

        const status = await prisma.userStatus.findUnique({
            where: { label: userStatus },
        });
        if (!status) {
            return res.status(400).json( {userStatus : "Mauvais statut défini"});
        }

        const newUser = await prisma.user.create({
            data: {
            mail,
            password: crypted_password,
            username,
            birthday: new Date(birthday),
            city,
            userStatusId: status.id,
            createdAt: new Date(),
            howManyTourn: 0,
            howManyMatches: 0,
            wonTournaments: 0,
            },
        })

        const access_token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            message: "Utilisateur crée !",
            id: newUser.id,
            mail: newUser.mail,
            username: newUser.username,
            birthday: newUser.birthday,
            city: newUser.city,
            userStatusId: status.id,
            token: access_token
        })
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
}

exports.login = async (req, res, next) => {

    try {
        const { mail, password} = req.body;

        const user = await prisma.user.findUnique({
            where: { mail },
        });

        if(!user) {
            return res.status(400).json( {error : error.message});
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' });
        }

        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            mail: user.mail,
            token: access_token
        })
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { mail, password, username, birthday, city, userStatus } = req.body;

        const status = await prisma.userStatus.findUnique({
            where: { label: userStatus },
        });
        if (!status) {
            return res.status(400).json( {userStatus : "Mauvais statut défini"});
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                mail,
                password,
                username,
                birthday: new Date(birthday),
                city,
                userStatusId: status.id,
            },
        });

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({message: "Utilisateur supprimé !"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserStatus = async (req, res, next) => {
    try {
        const status = await prisma.userStatus.findUnique();
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserMatches = async (req, res, next) => {
    try {
        const { id } = req.params;
        const matches = await prisma.match.findMany({
            where: {
                OR: [
                    {player1Id: parseInt(id)},
                    {player2Id: parseInt(id)},
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

        res.json(matches);
    } catch (error) {
        res.status(500).json({ userMatches: error.message });
    }
};

exports.getUserTournaments = async (req, res, next) => {
    try {
        const { id } = req.params;
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

        res.json(tournaments);
    } catch (error) {
        res.status(500).json({ useTournaments: error.message });
    }
};