import Joi from '@hapi/joi' 
export const CEItransactionsSchema = Joi.object({
    cached: Joi.boolean(),
})