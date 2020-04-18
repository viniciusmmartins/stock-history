import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep } from '../../../utils/timers';

export default class CEIScrapperController extends ScrapperController {
    constructor() {
        super()
    }
    /**
     * 
     * @param {String} category 
     */
    async getTransactions(fields) {

        const browser = await puppeteer.launch()
        const url = 'https://cei.b3.com.br/CEI_Responsivo/'
        const basePathForScreenshoots = './assets/screens/'
        try {
            consoleColorfy('Openning browser...', 'green');
            consoleColorfy('Browser open...')
            consoleColorfy('Creating page...')
            const page = await browser.newPage()
            consoleColorfy(`Getting transactions from ${url}`, 'green')
            await page.goto(url)
            await page.screenshot({ path: 'Login.png' })
            consoleColorfy('Waiting for page to load', 'yellow')
            await this.login(page)
            await page.screenshot({ path: 'Main-page.png' })
            await page.goto('https://cei.b3.com.br/CEI_Responsivo/negociacao-de-ativos.aspx')
            await this.queryStocks(page);
            const response = await this.getStocks(page)
            await page.screenshot({ path: 'ativos.png' })
            await this.logout(page)
            await page.screenshot({ path: 'logout.png' })
            await browser.close()
            consoleColorfy('Browser closed', 'red')
            return response

        } catch (error) {
            console.error("Controller error => ", error);
            await browser.close()
            consoleColorfy('Browser closed', 'red')
            throw { error: error.code || 500, message: 'Error retrieving news' }
        } finally {

        }



    }
    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async login(page) {

        const feeds = await page.evaluate(() => {
            const inputs = document.getElementsByClassName('large-12')[0].querySelectorAll('.row:not(.collapse)')
            const result = [];
            try {
                inputs[0].querySelector('input').value = '32088635866'
                inputs[1].querySelector('input').value = 'Cafezes@5108'
                inputs[2].querySelector('input').click()
            } catch (err) {
                console.error(err);

            }
            return result
        })
        await sleep(10000)
        return feeds
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async logout(page) {
        consoleColorfy('Logging out..', 'whiteBright')
        await page.goto('https://cei.b3.com.br/CEI_Responsivo/login.aspx?MSG=SESENC')
        await sleep(5000)
        consoleColorfy('Logged out!!', 'red')
        return
    }
    async queryStocks(page) {
        try {
            await page.evaluate(() => {
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[0].querySelector('select').value = '308'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[2].querySelector('input').value = '01/01/2020'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[3].querySelector('input').value = '16/04/2020'
                document.getElementsByClassName('filtro')[0].nextElementSibling.querySelector('input').click()
                return
            })
            await sleep(3000)
            return

        } catch (err) {
            console.error(err)
            throw { error: 500}
        }
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async getStocks(page) {
        const stocks = await page.evaluate(() => {
            const table = {
                thead: [

                ],
                tbody: [
                ]
            }

            const theaders = document.querySelector('thead').getElementsByTagName('th')
            for (let index = 0; index < theaders.length; index++) {
                let th = theaders[index];
                table.thead.push(th.textContent.trim().replace(/\\n/ig,''))
            }
            const rows = document.querySelector('tbody').getElementsByTagName('tr')
            for (let trIndex = 0; trIndex < rows.length; trIndex++) {
                let rowElements = rows[trIndex].querySelectorAll('td');
                let row = []
                for (let tdIndex = 0; tdIndex < rowElements.length; tdIndex++) {
                    row.push(rowElements[tdIndex].textContent.trim().replace(/\\n/ig,''))
                }
                table.tbody.push(row)
            }
            return JSON.parse(JSON.stringify(table))
        })
        return stocks
    }
    getURL(fields = {}) {
        let url = `https://g1.globo.com/busca/`
        const { search, order, species, from } = fields
        try {
            if (fields) {
                url += '?'
                url += `q=${search || 'economia'}&`
                url += `order=${order || 'recent'}&`
                url += `species=${species || 'notícias'}&`
                if (from) url += `from=${from}&`
            }
        }
        catch{
            console.error(error);
        }
        return url;
    }

}