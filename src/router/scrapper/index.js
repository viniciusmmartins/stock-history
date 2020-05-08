import { Router } from "express";
import globo from "./globo";
import cei from "./cei";
import dividends from "./dividends";

const router = Router()

const initRouter = () => {
    router.get('',getHelper)
    router.use('/cei', cei)
    router.use('/globo', globo)
    router.use('/dividends', dividends)

    return router;
}
const getHelper = (req,res) =>{
    const errorResponse = {
        message:'You should specify which scrapper you wanna use',
        avaiableScrappers: ['g1','globo','dividends']
    }
    res.status(400).json(  errorResponse )
}
export default initRouter()