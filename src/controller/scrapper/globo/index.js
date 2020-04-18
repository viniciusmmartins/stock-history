import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep } from '../../../utils/timers';
import chalk from 'chalk';

export default class GloboScrapperController extends ScrapperController {
    constructor() {
        super()
    }
    /**
     * 
     * @param {String} category 
     */
    async getNews(fields) {
        consoleColorfy('Openning browser...\n', 'green');
        const browser = await puppeteer.launch()
        const url = this.getURL(fields)
        let err = null
        try {
            consoleColorfy('Browser open...')
            const page = await browser.newPage()
            await page.goto(url)
            const news = await this.getDataFromMainPage(page, url)
            consolejColorfy('Closing browser...')
            return news
        } catch (error) {
            console.error("Controller error => ", JSON.parse(JSON.stringify(error)));
            err = error
        }finally{
            browser.close()
            consoleColorfy('Browser closed...\n')
            console.log(chalk.bgGreen.black('Have a nice one!🖖'))
            if(err)throw { error: err.code || 500, message: 'Error retrieving news' }
        }
    }
    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async getDataFromMainPage(page, url, itemTargetCount = 500) {
        consoleColorfy(`Getting news from ${url}`, 'green')
        let items = [];
        try {
            while (items.length < itemTargetCount) {
                items = await this.getItems(page)
                consoleColorfy(`Number of news retrieved: ${items.length} of ${itemTargetCount}`)
                try{
                    await page.click('.pagination a')
                    await page.waitFor((itemsLength) => document.querySelectorAll('.widget--info__text-container').length > itemsLength, {}, items.length);
                }
                catch(err){
                    consoleColorfy('End of news!','red')
                    break;
                }
            }
            return items
        } catch (err) {
            console.error(err);
            consoleColorfy('Returning finded items', 'green')
            return items
        }
    }
    /**
   * 
   * @param {puppeteer.Page} page 
   */
    async getItems(page) {
        return await page.evaluate(() => {
            const list = document.querySelector('.results__list').querySelectorAll('li')
            const items = []
            for (let index = 0; index < list.length; index++) {
                try {
                    const info = list[index]
                    let title = info.getElementsByClassName('widget--info__title')
                    // let href = info.getElementsByTagName('a')[0].getAttribute('href')
                    // let resume = info.getElementsByClassName('widget--info__description')
                    let datetime = info.getElementsByClassName('widget--info__meta')
                    let source = info.getElementsByClassName('widget--info__header')
                    const news = {
                        title: {
                            text: title[0].textContent.trim().replace(/\\n/ig, ''),
                            // href
                        },
                        // resume: resume[0].textContent.trim().replace(/\\n/ig, ''),
                        metadata: {
                            datetime: datetime[0].textContent.trim().replace(/\\n/ig, ''),
                            source: source[0].textContent.trim().replace(/\\n/ig, '')
                        }
                    }
                    items.push(news);
                } catch (err) {
                    const noResultElement = document.querySelector('.widget--no-results')
                    if(noResultElement){
                        items.push({
                            title: 'No itens were found for this search'
                        });
                    }
                }
            }
            return JSON.parse(JSON.stringify(items));
        })
    }
    getURL(fields = {}) {
        let url = `https://g1.globo.com/busca/`
        const { search, order, from, to } = fields
        const date = new Date(from)
        const formattedDate = date.toISOString().replace(/.[^.]*$/,'-0300')
        try {
            url += '?'
            url += `q=${search || 'economia'}&`
            url += `order=${order || 'recent'}&`
            url += `species=notícias&`
            url += `from=${formattedDate || 'now-1w'}&`
            if(to) url += `to=${to}&`
        }
        catch{
            console.error(error);
        }
        return url;
    }

}