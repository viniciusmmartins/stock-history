import { validator } from "../../../config/validator";
import { getStockPriceSchema } from "./schemas";
import { StocksController } from "../../../controller/scrapper/stocks";
import { Router } from "express";

const router = Router()

const initRouter = () =>{
    router.route('/price/:stock').get(validator.params(getStockPriceSchema), find)

    return router;
}

const find = async (req,res) =>{
    try{
        const {stock} = req.params
        const stocksController = new StocksController()
        const response = await stocksController.getStockPrice(stock)
        console.log(response)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}

export default initRouter()