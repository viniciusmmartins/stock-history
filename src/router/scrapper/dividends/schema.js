import Joi from '@hapi/joi' 
export const notifybyEmailSchema = Joi.object({
    to: Joi.string().required(),
})