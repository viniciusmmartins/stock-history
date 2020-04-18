import Joi from '@hapi/joi' 
export const CEItransactionsSchema = Joi.object({
    user: Joi.string().length(11).regex(/^\d+$/),
    password: Joi.string(),
})