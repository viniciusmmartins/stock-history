import { Router } from "express";
import globo from "./globo";
import g1 from "./g1";
import cei from "./cei";

const router = Router()

const initRouter = () => {
    router.get('',getHelper)
    router.use('/cei', cei)
    router.use('/globo', globo)
    router.use('/g1', g1)

    return router;
}
const getHelper = (req,res) =>{
    const errorResponse = {
        message:'You should specify which scrapper you wanna use',
        avaiableScrappers: ['g1','globo']
    }
    res.status(400).json(  errorResponse )
}
export default initRouter()