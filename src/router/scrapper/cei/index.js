import { Router } from "express";
import CEIScrapperController from "../../../controller/scrapper/cei";

const router = Router()

const initRouter = () =>{
    router.route('/').get( getTransactions)

    return router;
}

const getTransactions = async (req,res) =>{
    try{
        const {user,password} = req.body
        const scrapperController = new CEIScrapperController()
        const response = await scrapperController.getTransactions(user,password)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}

export default initRouter()