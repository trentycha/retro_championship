const { prisma } = require('../lib/prisma');

exports.getAllGame = async (req, res, next) => {
            try {
                const game = await prisma.game.findMany();
                res.status(200).json(game);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.getGameById = async (req, res, next) => {

            try {
                const game = await prisma.game.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                res.status(200).json(game);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};


exports.createGame = async (req, res, next) => {

    try {
        const { name, license, typeGame } = req.body;

        const licenseGame = await prisma.license.findFirst({
            where: { name: license },
        });
        if (!licenseGame) {
            return res.status(400).json( {license : "Pas de licence trouvée"});
        }

        const type = await prisma.typeGame.findFirst({
            where: { name: typeGame },
        });
        if (!type) {
            return res.status(400).json( {type : "Pas de type trouvé"});
        }

        const newGame = await prisma.game.create({
            data: {
            name,
            licenseId: licenseGame.id,
            typeGameId: type.id,
            },
        })
        res.status(201).json(newGame)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.updateGame = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { name, license, typeGame } = req.body;

        const licenseGameUpdate = await prisma.license.findFirst({
            where: { name: license },
        });
        if (!licenseGameUpdate) {
            return res.status(400).json( {license : "Pas de licence trouvée"});
        }

        const typeUpdate = await prisma.typeGame.findFirst({
            where: { name: typeGame },
        });
        if (!typeUpdate) {
            return res.status(400).json( {type : "Pas de type trouvé"});
        }

        const updateGame = await prisma.game.update({
            where: { id: parseInt(id) },
            data: {
            name,
            licenseId: licenseGameUpdate.id,
            typeGameId: typeUpdate.id,
            },
        })
        res.status(201).json(updateGame)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.deleteGame = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedGame = await prisma.game.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({message: "Jeu supprimé !"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};