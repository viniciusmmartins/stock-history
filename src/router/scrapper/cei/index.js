import { Router } from "express";
import CEIScrapperController from "../../../controller/scrapper/cei";
import { validator } from "../../../config/validator";
import {CEItransactionsSchema} from './schemas'

const router = Router()

const initRouter = () =>{
    router.route('/').post(validator.body(CEItransactionsSchema), getTransactions)

    return router;
}

const getTransactions = async (req,res) =>{
    try{
        const {cached} = req.body
        const {username, password } = req.user
        const scrapperController = new CEIScrapperController()
        const response = await scrapperController.getTransactions(username,password,cached)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}

export default initRouter()