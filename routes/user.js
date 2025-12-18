const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré de l'utilisateur
 *         mail:
 *           type: string
 *           format: email
 *           description: L'email de l'utilisateur
 *         username:
 *           type: string
 *           description: Le nom d'utilisateur
 *         birthday:
 *           type: string
 *           format: date
 *           description: La date de naissance
 *         city:
 *           type: string
 *           description: La ville de l'utilisateur
 *         userStatusId:
 *           type: integer
 *           description: L'ID du statut
 *       example:
 *         id: 1
 *         mail: jean@example.com
 *         username: Jean789
 *         birthday: 1974-01-30
 *         city: Laval
 *         userStatusId: 1
 *
 *     UserSignup:
 *       type: object
 *       required:
 *         - mail
 *         - password
 *         - username
 *         - birthday
 *         - city
 *         - userStatus
 *       properties:
 *         mail:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         username:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *           description: Format YYYY-MM-DD
 *         city:
 *           type: string
 *         userStatus:
 *           type: string
 *           enum: [Gamer, Admin, Viewer]
 *       example:
 *         mail: jean@example.com
 *         password: securePassword123
 *         username: Jean789
 *         birthday: 1974-01-30
 *         city: Laval
 *         userStatus: Gamer
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - mail
 *         - password
 *       properties:
 *         mail:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         mail: jean@example.com
 *         password: securePassword123
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur lors de la récupération
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/users/{id}/matches:
 *   get:
 *     summary: Récupérer tous les matchs d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des matchs récupérée avec succès
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/matches", auth, userController.getUserMatches);

/**
 * @swagger
 * /api/users/{id}/tournaments:
 *   get:
 *     summary: Récupérer tous les tournois d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des tournois récupérée avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/tournaments", auth, userController.getUserTournaments);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Créer un nouveau compte utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur créé !
 *                 id:
 *                   type: integer
 *                 mail:
 *                   type: string
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Erreur de validation
 *       409:
 *         description: Email ou username déjà existant
 */
router.post("/register", userController.signup);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Se connecter avec un compte existant
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mail:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 */
router.put("/:id", auth, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur supprimé !
 *       400:
 *         description: Erreur lors de la suppression
 *       401:
 *         description: Non autorisé
 */
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;