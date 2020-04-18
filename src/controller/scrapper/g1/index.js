import ScrapperController from "..";

export default class G1ScrapperController extends ScrapperController{
    constructor(){

    }

    getNews(){
        const browser = await puppeteer.launch()
        const page = await browser.newPage('https://cei.b3.com.br/CEI_Responsivo/')
        console.log('Open browser...');
        await page.goto('https://cei.b3.com.br/CEI_Responsivo/')
        console.log('Open browser...');
    }

}