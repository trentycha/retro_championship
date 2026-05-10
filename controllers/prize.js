const { prisma } = require('../lib/prisma');

exports.getPrizeById = async (req, res) => {
    try {
        const prize = await prisma.prize.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json(prize);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createPrize = async (req, res) => {
    try {
        const { name, description, value } = req.body;

        const newPrize = await prisma.prize.create({
            data: {
                name,
                description,
                value,
                userId: req.auth.userId,
            },
        });
        res.status(201).json(newPrize);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePrize = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, value, user } = req.body;

        const creatorPrize = await prisma.user.findFirst({
            where: { username: user },
        });
        if (!creatorPrize) {
            return res.status(400).json({ admin: "Pas d'admin trouvé" });
        }

        const updatePrize = await prisma.prize.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                value,
                userId: creatorPrize.id,
            },
        });
        res.status(200).json(updatePrize);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePrize = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPrize = await prisma.prize.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).json({ message: 'Prix supprimé !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
