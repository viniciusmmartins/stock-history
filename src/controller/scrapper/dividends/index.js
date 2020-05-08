import ScrapperController from "..";
import * as cheerio from 'cheerio';
import * as fetch from 'node-fetch'
import { DIVIDENDS_CALENDAR_URL,DIVIDENDS_DICTIONARY } from "../../../config/dividends";
export default class DividendsController extends ScrapperController {
    constructor() {
        super()
    }
    async searchForDividends() {
        try {
            const response = await fetch(DIVIDENDS_CALENDAR_URL)
            if (response) {
                const html = await response.text()
                const $ = cheerio.load(html);
                const tables = $('#dilist tbody')
                if (tables) {
                    const result = []
                    for (let index = 0; index < tables.length; index++) {
                        let table = tables[index];
                        let dividend = []
                        const rows = table.children
                        rows.forEach((row,index) => {
                            try {
                                const column = row.children.filter((column) => column.name == 'td')
                                const label = $(column[0]).text()
                                const value =  $(column[1]).text()
                                const word = DIVIDENDS_DICTIONARY.find((div_dic) => label.includes(div_dic.label))
                                console.log(word)
                                if(!word) return;
                                let field = {
                                    key: word ? word.key : label,
                                    value
                                }
                                if(word.key == 'value'){
                                    const nextValue = $(rows[index+1].children.filter(column => column.name == 'td')[0]).text()
                                    field = {
                                        ...field,
                                        value: [value, nextValue]
                                    }
                                }
                                
                                dividend.push(field)
                            } catch{ }
                        })
                        result.push(dividend)
                    }
                    return result
                } else {
                    throw { code: 404, message: 'Dividends not found' }
                }
            } else {
                throw { code: 500, message: 'Error getting page' }
            }
        }
        catch (err) {
            throw { code: err.code, message: err.message }
        }
    }
}