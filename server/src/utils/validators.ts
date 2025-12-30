import Joi from 'joi';

// ולידציה לרישום
export const registerSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(9).required(),
    role: Joi.string().valid('admin', 'user').optional()
});

// ולידציה להתחברות
export const loginSchema = Joi.object({
    id: Joi.string().required()
});

// ולידציה ליצירת קטגוריה
export const categorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
});

// ולידציה לשאילתת AI
export const askAISchema = Joi.object({
    subCategoryId: Joi.number().integer().required(),
    messages: Joi.array().items(
        Joi.object({
            role: Joi.string().valid('user', 'assistant', 'system').required(),
            content: Joi.string().required()
        })
    ).min(1).required()
});