import Joi from '@hapi/joi' 
export const getStockPriceSchema = Joi.object({
    stock:  Joi.string().required().regex(/[A-Z]{4}[0-9]([0-4])?F?/)
})
export const getStocksPriceSchema = Joi.object({
    stocks:  Joi.array().items(Joi.string().required().regex(/[A-Z]{4}[0-9]([0-4])?F?/))
})