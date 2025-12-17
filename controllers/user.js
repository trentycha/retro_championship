const { prisma } = require('../lib/prisma');

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
            password,
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
        res.status(201).json(newUser)
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

        res.status(200).json(user)
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
