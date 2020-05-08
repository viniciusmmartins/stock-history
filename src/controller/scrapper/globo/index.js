import puppeteer, { errors } from 'puppeteer'
import ScrapperController from '..';
import { consoleColorfy } from '../../../utils/colors';
import { sleep } from '../../../utils/timers';
import chalk from 'chalk';
import * as fse from 'fs-extra';

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
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        const url = this.getURL(fields)
        let err = null
        let news = []
        try {
            consoleColorfy('Browser open...')
            const page = await browser.newPage()
            await page.goto(url)
            news = await this.getDataFromMainPage(page, url)
            news = await this.getDataFromNewsPage(page,news)
            // await this.generateFilesByNews(news)
            consoleColorfy('Closing browser...')
            
        } catch (error) {
            console.error("Controller error => ", JSON.parse(JSON.stringify(error)));
            err = error
        } finally {
            browser.close()
            consoleColorfy('Browser closed...\n')
            console.log(chalk.bgGreen.black('Have a nice one!🖖'))
            if (err) throw { error: err.code || 500, message: 'Error retrieving news' }
        }
        return news
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    * @param {Array<Object>} news 
    */
    async getDataFromNewsPage(page, news) {
        try{
            for (let index = 0; index < news.length; index++) {
                const n = news[index];
                let href = n.title.href
                consoleColorfy(`Getting article from news number ${index} `)
                const article = await this.getContentFromPage(page,href)
                news[index].resume = article
            }
            console.log('News',news)
            return news
        }catch(err){
            console.error(err);
            
            return news
        }
        
    }
    /**
    * 
    * @param {puppeteer.Page} page 
    * @param {string} url 
    */
    async getContentFromPage(page,url) {
        try{
            consoleColorfy(`Entering page ${url}...`)

            await page.goto(url)
            return await page.evaluate(()=>{
              const paragraphs =  document.querySelectorAll('article  p')
              let article = ''
              for (let index = 0; index < paragraphs.length; index++) {

                  const p = paragraphs[index];
                  const txt = p.textContent
                    article = article + p.textContent
              }
              return article
            })
        }catch(err){
            console.error(err);
            
            return ''
        }
        
    }
    /**
     * 
     * @param {puppeteer.Page} page 
     */
    async getDataFromMainPage(page, url, itemTargetCount = 10) {
        consoleColorfy(`Getting news from ${url}`, 'green')
        let items = [];
        try {
            while (items.length < itemTargetCount) {
                items = await this.getItems(page)
                consoleColorfy(`Number of news retrieved: ${items.length} of ${itemTargetCount}`)
                try {
                    await page.waitFor('.pagination a')
                    await page.waitFor(200)
                    await page.click('.pagination a')
                    await page.waitFor((itemsLength) => document.querySelectorAll('.widget--info__text-container').length > itemsLength, {}, items.length);
                }
                catch (err) {
                    console.error(err);

                    consoleColorfy('End of news!', 'red')
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
  * @param {Array<Object>} news 
  */
    async generateFilesByNews(news) {
        await news.forEach(async (n, index) => {
            fse.outputFileSync(`news/doc_${index}.txt`, n.title.text)
            if (index % 10) console.log(`File number ${chalk.green(index)} out of ${chalk.red(news.length)} generated`)
        })
        return news
    }
    /**
   * 
   * @param {puppeteer.Page} page 
   */
    async getItems(page) {
        try {
            return await page.evaluate(() => {
                const list = document.querySelector('.results__list').querySelectorAll('li')
                const items = []
                for (let index = 0; index < list.length; index++) {
                    try {
                        const info = list[index]
                        let title = info.getElementsByClassName('widget--info__title')
                        let href = info.getElementsByTagName('a')[0].getAttribute('href')
                        // let resume = info.getElementsByClassName('widget--info__description')
                        let datetime = info.getElementsByClassName('widget--info__meta')
                        let source = info.getElementsByClassName('widget--info__header')
                        const news = {
                            title: {
                                text: title[0].textContent.trim().replace(/\\n/ig, ''),
                                href: href.replace('//','https://')
                            },
                            metadata: {
                                datetime: datetime[0].textContent.trim().replace(/\\n/ig, ''),
                                source: source[0].textContent.trim().replace(/\\n/ig, '')
                            }
                        }
                        items.push(news);
                    } catch (err) {
                        const noResultElement = document.querySelector('.widget--no-results')
                        if (noResultElement) {
                            items.push({
                                title: 'No itens were found for this search'
                            });
                        }
                    }
                }
                return JSON.parse(JSON.stringify(items));
            })
        } catch (err) {
            console.error("Get items error", err);
            throw err
        }

    }
    getURL(fields = {}) {
        let url = `https://g1.globo.com/busca/`
        const { search, order, from, to } = fields
        const date = new Date(from)
        const formattedDate = date.toISOString().replace(/.[^.]*$/, '-0300')
        try {
            url += '?'
            url += `q=${search || 'economia'}&`
            url += `order=${order || 'recent'}&`
            url += `species=notícias&`
            url += `from=${formattedDate || 'now-1w'}&`
            if (to) url += `to=${to}&`
        }
        catch{
            console.error(error);
        }
        console.log(url)
        return url;
    }

}