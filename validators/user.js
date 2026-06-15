const { z } = require('zod');

const signupSchema = z.object({
    mail: z.string().email("L'adresse email n'est pas valide"),
    password: z
        .string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    birthday: z
        .string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    city: z.string().min(1, 'La ville est requise'),
    userStatus: z.string().min(1, 'Le statut est requis'),
});

const loginSchema = z.object({
    mail: z.string().email("L'adresse email n'est pas valide"),
    password: z
        .string()
        .min(4, 'Le mot de passe doit contenir au moins 4 caractères'),
});

const updateUserSchema = z.object({
    mail: z.string().email("L'adresse email n'est pas valide"),
    password: z
        .string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    birthday: z
        .string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    city: z.string().min(1, 'La ville est requise'),
    userStatus: z.string().min(1, 'Le statut est requis'),
});

module.exports = { signupSchema, loginSchema, updateUserSchema };
