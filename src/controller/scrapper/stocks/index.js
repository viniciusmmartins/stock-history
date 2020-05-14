import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { STOCK_PRICE_URL } from '../../../config/stocks'

export class StocksController{
    constructor(){

    }
    /**
     * 
     * @param {string} stockCode 
     */
    async getStockPrice(stockCode){
        try{
            const page = await fetch(`${STOCK_PRICE_URL}/${stockCode}`)
            if (page) {
                const html = await page.text()
                const $ = cheerio.load(html);
                let price = $('[title="Valor atual do ativo"] > .value').text()
                const response = { 
                    code: stockCode,
                    price: price ? price : 'Not found',
                    timestamp: Date.now()
                }
                return response
            }else{
                return null
            }
        }catch(err){
            console.error(err);
            return null;
        }
        
    }   
}