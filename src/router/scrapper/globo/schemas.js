import Joi from '@hapi/joi'
export const getNewsQuerySchema = Joi.object({
    category: Joi.string().pattern(/ economia/)
})