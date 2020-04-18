import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep } from '../../../utils/timers';

export default class GloboScrapperController extends ScrapperController {
    constructor() {
        super()
    }
    /**
     * 
     * @param {String} category 
     */
    async getNews(fields) {

        const browser = await puppeteer.launch()
        const url = this.getURL(fields)
        try {
            consoleColorfy('Openning browser...', 'green');
            consoleColorfy('Browser open...')
            consoleColorfy('Creating page...')
            const page = await browser.newPage()
            consoleColorfy(`Getting news from ${url}`, 'green')
            await page.goto(url)
            consoleColorfy('Waiting for page to load', 'yellow')
            const news = await this.getDataFromMainPage(page)
            console.log(news);
            browser.close()
            return news
        } catch (error) {
            console.error("Controller error => ", JSON.parse(JSON.stringify(error)));
            browser.close()
            throw { error: error.code || 500, message: 'Error retrieving news' }
        }

    }
    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async getDataFromMainPage(page) {

        const feeds = await page.evaluate(() => {
            const feedBody = document.getElementsByClassName('widget--info__text-container');
            const result = [];
            for (let i = 0; i < feedBody.length; i++) {
                try {
                    let title = feedBody[i].getElementsByClassName('widget--info__title')
                    let href = feedBody[i].getElementsByTagName('a')[0].getAttribute('href')
                    let resume = feedBody[i].getElementsByClassName('widget--info__description')
                    let datetime = feedBody[i].getElementsByClassName('widget--info__meta')
                    let source = feedBody[i].getElementsByClassName('widget--info__header')
                    const news = {
                        title: {
                            text: title[0].textContent,
                            href
                        },
                        resume: resume[0].textContent,
                        metadata: {
                            datetime: datetime[0].textContent,
                            source: source[0].textContent
                        }
                    }
                    result.push(news);
                } catch (err) {
                    result.push({});
                }
            }
            return JSON.stringify(result);
        })

        return JSON.parse(feeds)
    }
    getURL(fields = {}) {
        let url = `https://g1.globo.com/busca/`
        const { search, order, species, from  } = fields
        try {
            if (fields) {
                url += '?'
                url += `q=${search || 'economia'}&`
                url += `order=${order || 'recent'}&`
                url += `species=${species || 'notícias'}&`
                if(from) url += `from=${from}&`
            }
        }
        catch{
            console.error(error);
        }
        return url;
    }

}