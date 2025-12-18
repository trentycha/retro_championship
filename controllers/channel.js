const { prisma } = require('../lib/prisma');

exports.getAllChannel = async (req, res, next) => {
            try {
                const channel = await prisma.channel.findMany();
                res.status(200).json(channel);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};

exports.getChannelById = async (req, res, next) => {

            try {
                const channel = await prisma.channel.findUnique({
                    where: { id: parseInt(req.params.id) },
                });
                res.status(200).json(channel);
            } catch (error) {
                res.status(400).json( {error : error.message});
            }
};


exports.createChannel = async (req, res, next) => {

    try {
        const { label } = req.body;

        const newChannel = await prisma.channel.create({
            data: {
            label,
            },
        })
        res.status(201).json(newChannel)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.updateChannel = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { label } = req.body;

        const updateChannel = await prisma.channel.update({
            where: { id: parseInt(id) },
            data: {
            label,
            },
        })
        res.status(200).json(updateChannel)
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.deleteChannel = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedChannel = await prisma.channel.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({message: "Chaîne supprimée !"});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};