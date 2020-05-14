import { validator } from "../../../config/validator";
import { getStockPriceSchema,getStocksPriceSchema } from "./schemas";
import { StocksController } from "../../../controller/scrapper/stocks";
import { Router } from "express";

const router = Router()

const initRouter = () =>{
    router.route('/price/').get(validator.query(getStocksPriceSchema), findMany)
    router.route('/price/:stock').get(validator.params(getStockPriceSchema), find)

    return router;
}

const find = async (req,res) =>{
    try{
        const {stock} = req.params
        const stocksController = new StocksController()
        const response = await stocksController.getStockPrice(stock)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}
const findMany = async (req,res) =>{
    try{
        const {stocks} = req.query
        const stocksController = new StocksController()
        const response = await stocksController.getMultipleStockPrices(stocks)
        res.status(200).json(response)
    }
    catch(err){
        console.error("Router error => ",err)
        res.status(err.code || 500).json({message: err.message || 'Internal server error'})
    }
}

export default initRouter()