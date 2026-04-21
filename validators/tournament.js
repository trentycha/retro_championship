const { z } = require('zod');

const createTournamentSchema = z.object({
    name: z.string().min(1, "Le nom du tournoi est requis"),
    startedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/, "La date de début n'est pas valide"),
    endedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/, "La date de fin n'est pas valide"),
    game: z.string().min(1, "Le jeu est requis"),
    creator: z.string().min(1, "Le créateur est requis"),
    tournamentStatus: z.string().min(1, "Le statut est requis"),
});

const updateTournamentSchema = z.object({
    name: z.string().min(1, "Le nom du tournoi est requis"),
    startedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/, "La date de début n'est pas valide"),
    endedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/, "La date de fin n'est pas valide"),
    game: z.string().min(1, "Le jeu est requis"),
    creator: z.string().min(1, "Le créateur est requis"),
    tournamentStatus: z.string().min(1, "Le statut est requis"),
});

module.exports = { createTournamentSchema, updateTournamentSchema };