import { Router } from "express";
import GloboScrapperController from "../../../controller/scrapper/globo";
import { validator } from "../../../config/validator";
import { getNewsQuerySchema } from "./schemas";

const router = Router()

const initRouter = () =>{
    router.route('/').get( getNews)

    return router;
}

const getNews = async (req,res) =>{
    try{
        const {category} = req.query
        const scrapperController = new GloboScrapperController()
        const response = await scrapperController.getNews(category)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}

export default initRouter()