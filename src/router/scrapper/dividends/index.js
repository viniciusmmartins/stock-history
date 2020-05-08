import { Router } from "express"

import DividendsController from "../../../controller/scrapper/dividends";
const router = Router()

const initRouter = () =>{
    router.route('/calendar').get(search)
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
export default initRouter()