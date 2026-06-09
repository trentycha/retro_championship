require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/user');

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.signup = async (req, res) => {
    try {
        const newUser = await userService.signup(req.body);

        const access_token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.status(201).json({
            message: 'Utilisateur créé !',
            id: newUser.id,
            mail: newUser.mail,
            username: newUser.username,
            birthday: newUser.birthday,
            city: newUser.city,
            userStatusId: newUser.userStatusId,
            token: access_token,
        });
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues[0].message });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.login(req.body);

        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '12h',
        });

        res.status(200).json({
            mail: user.mail,
            token: access_token,
        });
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues[0].message });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { updatedUser } = await userService.updateUser(
            req.params.id,
            req.body
        );

        const access_token = jwt.sign(
            { id: updatedUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.status(200).json({
            message: 'Utilisateur modifié !',
            id: updatedUser.id,
            mail: updatedUser.mail,
            username: updatedUser.username,
            birthday: updatedUser.birthday,
            city: updatedUser.city,
            userStatusId: updatedUser.userStatusId,
            token: access_token,
        });
    } catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues[0].message });
        }
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);

        res.status(204).json({ message: 'Utilisateur supprimé !' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getUserMatches = async (req, res) => {
    try {
        const matches = await userService.getUserMatches(req.params.id);

        res.status(200).json(matches);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getUserTournaments = async (req, res) => {
    try {
        const tournaments = await userService.getUserTournaments(req.params.id);

        res.status(200).json(tournaments);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
