import { Router } from "express";

const router = Router()

const initRouter = () =>{
    router.use('',getNews)
    return router;
}

const getNews = (req,res) =>{
    try{
        res.status(200).json({message: 'Teste'})
    }
    catch(err){
        console.error(err)
        res.status(500).end()
    }
}

export default initRouter()