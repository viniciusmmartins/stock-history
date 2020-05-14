import { Router } from "express";
import CEIScrapperController from "../../../controller/scrapper/cei";
import { validator } from "../../../config/validator";
import {CEItransactionsSchema} from './schemas'

const router = Router()

const initRouter = () =>{
    router.route('/')
    .get( findEmails)
    .post( addEmail)
    .patch( updateEmail)
    .delete( deleteEmail)

    return router;
}
const findEmails = (req,res) =>{

}
const addEmail = (req,res) =>{

}
const updateEmail = (req,res) =>{

}
const deleteEmail = (req,res) =>{

}


export default initRouter()