import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep, isToday } from '../../../utils/timers';
import { CEI_LOGOUT_URL, CEI_STOCKS_URL, CEI_BASE_URL, CEI_HEADER_DICTIONARY } from '../../../config/cei';
import * as fse from 'fs-extra'
import { CEIStorageController } from '../../storage/cei';
import { getCurrentDate, subtractFromDate } from '../../../utils/utils';


export default class CEIScrapperController extends ScrapperController {
    constructor() {
        super()
        this.storageController = new CEIStorageController()
    }
    /**
     * 
     * @param {String} category 
     */
    async getTransactions(username, password, cached = true) {
        if(cached){
            const stocks = await this.getCachedTransactions(username)
            if (!stocks) {
                return await this.getDataWithPuppetter(username,password)
            } else {
                return stocks
            }
        }else{
            return await this.getDataWithPuppetter(username,password)
        }
    }
    async getDataWithPuppetter(username,password){
        try{
            return this.startScrapper(username, password)
        }catch(err){
            consoleColorfy(`Error getting data from web, trying to get last cached response`)
            return await this.getCachedTransactions(username)
        }
    }
    async startScrapper(username, password) {
        consoleColorfy('Starting scrapper 😊...\n', 'green');
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        let err = null
        let isLogged = false
        //Creating page
        const page = await browser.newPage()
        consoleColorfy('Entering the page login page...', 'green');
        try {
            //Going to base URL
            await page.goto(CEI_BASE_URL)
            //Loging in
            isLogged = await this.login(page, username, password)
            //Go to Stocks page
            await page.goto(CEI_STOCKS_URL)
            //Querying stocks
            await this.queryStocks(page);
            //Getting queried stocks
            let response = await this.getStocks(page)
            response = await this.cacheResponse(response, { username, password })
            //Close browser
            consoleColorfy('Yuhulll, we did it!🥳', 'green')
            return response
        } catch (error) {
            console.error("Controller error => ", error);
            err = error
        } finally {
            //After response, log-out
            if(isLogged) await this.logout(page)
            await browser.close()
            consoleColorfy('Browser closed', 'red')
            if (err) throw { error: err.code || 500, message: 'Error retrieving stocks' }
        }
    }

    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async login(page, username, password) {
        consoleColorfy(`Credentials are { username: ${username} , password:${password}}...`, 'cyan')
        consoleColorfy('Logging in...', 'blue')
        const fields = {
            username,
            password
        };

        await page.evaluate((fields) => {
            const inputs = document.getElementsByClassName('large-12')[0].querySelectorAll('.row:not(.collapse)')
            try {
                inputs[0].querySelector('input').value = fields.username || '32088635866'
                inputs[1].querySelector('input').type = 'text'
                inputs[1].querySelector('input').value = fields.password || 'Cafezes@5108'
            } catch (err) {
                console.error(err);
            }
            return
        }, fields)
        try {
            consoleColorfy('Trying to loggin...', 'blue')
            await page.click('input[type=submit]')
            page.on('dialog', async dialog => {
                await dialog.dismiss();
                throw { message: dialog.message() }
            });
            await page.waitForNavigation({ waitUntil: 'networkidle0' }),
                consoleColorfy('Logged in!!', 'green')
            return true

        }
        catch (err) {
            console.error("Login error", err)
            throw { code: 500, message: err.message || 'Error loggin in, it may be a problem with your credentials' }
        }

    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async logout(page) {
        consoleColorfy('Logging out...🤫', 'whiteBright')
        await page.goto(CEI_LOGOUT_URL)
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
            const toDate = subtractFromDate(2)
            await page.evaluate((toDate) => {
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[0].querySelector('select').value = '308'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[2].querySelector('input').value = '01/01/2020'
                document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[3].querySelector('input').value = toDate || '15/04/2020'
            }, toDate)
            await page.click('input[type=submit]')
            await page.waitFor('table');
            consoleColorfy(`Query done! Table is visible`, 'green')
            return
        } catch (err) {
            console.error(err)
            throw { error: 500, message: 'Querying failed' }
        }

    }
    /**
    * 
    * @param {puppeteer.Page} page 
    */
    async getStocks(page) {
        consoleColorfy(`Getting transactions tables...`, 'blue')
        const stocks = await page.evaluate((CEI_HEADER_DICTIONARY) => {
            const header = []
            const response = {
                transactions: []
            }
            const theaders = document.querySelector('thead').getElementsByTagName('th')
            for (let index = 0; index < theaders.length; index++) {
                let th = theaders[index];
                let label = th.textContent.trim().replace(/\\n/ig, '')
                let hd = CEI_HEADER_DICTIONARY.find((hd) => label.includes(hd.label))
                let headerCell = {
                    key: hd ? hd.key : label,
                    label
                }
                header.push(headerCell)
            }
            const rows = document.querySelector('tbody').getElementsByTagName('tr')
            for (let trIndex = 0; trIndex < rows.length; trIndex++) {
                let rowElements = rows[trIndex].querySelectorAll('td');
                let row = {}
                for (let tdIndex = 0; tdIndex < rowElements.length; tdIndex++) {
                    row[header[tdIndex].key] = rowElements[tdIndex].textContent.trim().replace(/\\n/ig, '')
                }
                response.transactions.push(row)
            }
            return response
        }, CEI_HEADER_DICTIONARY)
        consoleColorfy(`Stocks retrieved!`, 'green')
        return stocks
    }
    async getCachedTransactions(username) {
        try {
            const docs = await this.storageController.getStocks(username, { field: 'date', direction: 'desc' }, 1)
            if (!docs.empty) {
                let stock = docs.docs[0].data()
                const date = new Date(stock.date);
                if (isToday(date)) return stock
                else throw new Error('File outdated')
            } else {
                return null;
            }
        } catch (err) {
            const message = err && err.message ? err.message : 'Error getting cached response'
            consoleColorfy(message, 'red')
            return null
        }
    }
    async cacheResponse(response, username) {
        consoleColorfy('Caching response in the server...', 'blue');
        try {
            response = {
                ...response,
                date: Date.now()
            }
            const firebaseResponse = await this.storageController.saveStocks(username, response)
            const stocksSnapshot = await firebaseResponse.get()
            const stocks = stocksSnapshot.data()
            consoleColorfy(`Cached sucessfully firebase with id ${stocksSnapshot.id} `, 'green');
            return stocks
        } catch (err) {
            console.error(err);
            consoleColorfy(`Cache failed`, 'red');
            return
        }
    }
}