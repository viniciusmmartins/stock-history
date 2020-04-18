import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep } from '../../../utils/timers';
import { CEI_LOGOUT_URL, CEI_STOCKS_URL, CEI_BASE_URL } from '../../../config/cei';

export default class CEIScrapperController extends ScrapperController {
    constructor() {
        super()
    }
    /**
     * 
     * @param {String} category 
     */
    async getTransactions(user,password) {
        consoleColorfy('Starting scrapper 😊...', 'green');
        const browser = await puppeteer.launch()
        try {
            //Creating page
            const page = await browser.newPage()
            //Going to base URL
            await page.goto(CEI_BASE_URL)
            //Loging in
            await this.login(page,user,password)
            //Go to Stocks page
            await page.goto(CEI_STOCKS_URL)
            //Querying stocks
            await this.queryStocks(page);
            //Getting queried stocks
            const response = await this.getStocks(page)
            //After response, log-out
            await this.logout(page)
            //Close browser
            await browser.close()
            consoleColorfy('Browser closed', 'red')
            consoleColorfy('Yuhulll, we did it!🥳', 'green')
            return response
        } catch (error) {
            console.error("Controller error => ", error);
            await browser.close()
            consoleColorfy('Browser closed', 'red')
            throw { error: error.code || 500, message: 'Error retrieving stocks' }
        } finally {

        }
    }
    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async login(page,user,password) {
        consoleColorfy(`Credentials are { user: ${user} , password:${password}}...`,'blue')
        consoleColorfy('Logging in...','blue')
        await page.screenshot({ path: 'Login.png' })
        const fields = {
            user,
            password
        };
        console.log(fields);
        
        
        await page.evaluate((fields) => {
            const inputs = document.getElementsByClassName('large-12')[0].querySelectorAll('.row:not(.collapse)')
            try {
                inputs[0].querySelector('input').value = fields.user || '32088635866'
                inputs[1].querySelector('input').type = 'text'
                inputs[1].querySelector('input').value = fields.password || 'Cafezes@5108'
            } catch (err) {
                console.error(err);
            }
            return
        },fields)
        try{
            await page.screenshot({ path: 'Credentials.png' })
            consoleColorfy('Trying to loggin in...','blue')
            await page.click('input[type=submit]')
            await page.waitForNavigation({timeout: 60000, waitUntil: 'networkidle0' }),
            consoleColorfy('Logged in...','blue')
            await page.screenshot({ path: 'Main-page.png' })
        }
        catch(err){
            console.error(err)
            await page.screenshot({ path: 'Error.png' })
            throw { code: 500, message: 'Error loggin in, it may be a problem with your credentials'}
        }
     
        return true
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async logout(page) {
        consoleColorfy('Logging out...🤫', 'whiteBright')
        await page.goto(CEI_LOGOUT_URL)
        await page.screenshot({ path: 'logout.png' })
        consoleColorfy('Logged out!!😜', 'green')
        return
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async queryStocks(page) {
        try {
            consoleColorfy(`Querying transactions...`, 'blue')
            await page.evaluate(() => {
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[0].querySelector('select').value = '308'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[2].querySelector('input').value = '01/01/2020'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[3].querySelector('input').value = '16/04/2020'
            })
            await page.click('input[type=submit]')
            await page.waitFor('table');
            consoleColorfy(`Query done! Table is visible`,'green')
            return
        } catch (err) {
            console.error(err)
            throw { error: 500, message: 'Querying failed'}
        }

    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async getStocks(page) {
        consoleColorfy(`Getting transactions tables...`, 'blue')
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
                    row.push({
                        key: table.thead[tdIndex],
                        value: rowElements[tdIndex].textContent.trim().replace(/\\n/ig,'')
                    })
                }
                table.tbody.push(row)
            }
            return JSON.parse(JSON.stringify(table))
        })
        consoleColorfy(`Stocks retrieved!`,'green')
        await page.screenshot({ path: 'ativos.png',fullPage: true })
        return stocks
    }

}