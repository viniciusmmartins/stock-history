import Joi from '@hapi/joi' 
import DateJoi from '@hapi/joi-date'
export const getNewsQuerySchema = Joi.object({
    search: Joi.string(),
    order: Joi.string().pattern(/relevant|recent/),
    from: Joi.extend(DateJoi).date().format("DD/MM/YYYY"),
    to: Joi.extend(DateJoi).date().format("DD/MM/YYYY"),
})