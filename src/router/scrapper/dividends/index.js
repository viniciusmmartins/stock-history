import { Router } from "express"

import DividendsController from "../../../controller/scrapper/dividends";
import { EmailController } from "../../../controller/email";
import { validator } from "../../../config/validator";
import { notifybyEmailSchema } from "./schema";
import mailing from "./mailing";

const router = Router()

const initRouter = () =>{
    router.route('/calendar').get(search)
    router.post('/notify',validator.body(notifybyEmailSchema),notify)
    router.use('/mailing',mailing)
    return router;
}

const search = async (req,res) =>{
    try {
        const dividendsController = new DividendsController()
        const result = await dividendsController.searchForDividends()
        res.status(200).json(result)
    } catch (error) {
        res.status(error.code || 500).json({message: error.message || 'Internal server error'})
    }
   
}
const notify = async (req,res)=>{
    try {
        const {to} = req.body
        const dividendsController = new DividendsController()
        const result = await dividendsController.notifyNewDividends(to)
        res.status(200).json(result)
    } catch (error) {
        res.status(error.code || 500).json({message: error.message || 'Internal server error'})
    }
}
export default initRouter()