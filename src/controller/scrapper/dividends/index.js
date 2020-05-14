import ScrapperController from "..";
import * as cheerio from 'cheerio';
import * as fetch from 'node-fetch'
import { DIVIDENDS_CALENDAR_URL,DIVIDENDS_DICTIONARY,months} from "../../../config/dividends";
import moment from "moment";
import { getDividendsTemplate } from "../../../templates/emails";
import { EmailController } from "../../email";
moment.locale('pt-br')
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
                const tables = $('table tbody')
                if (tables) {
                    const result = []
                    for (let index = 0; index < tables.length; index++) {
                        let table = tables[index];
                        let dividend = {}
                        const rows = table.children
                        rows.forEach((row,index) => {
                            try {
                                const column = row.children.filter((column) => column.name == 'td')
                                const label = $(column[0]).text()
                                const value =  $(column[1]).text()
                                const word = DIVIDENDS_DICTIONARY.find((div_dic) => label.includes(div_dic.label))
                                if(!word) return;
                                let field = {
                                    [word ? word.key : label]: value
                                }
                                if(word.key == 'value'){
                                    let nextValue = ''
                                    try{
                                        nextValue = $(rows[index+1].children.filter(column => column.name == 'td')[0]).text()
                                    }catch{}
                                    field = this.formatStockValues(word,value,nextValue)
                                }
                                else if(word.key == 'code'){
                                    const formattedValue = value.match(/.*?(?= *-)/)[0]
                                    field = {
                                        [word ? word.key : label]: formattedValue,
                                    }
                                }
                                if(word.type == 'date'){
                                   
                                    field = this.formatDate(word,value)
                                    if(word.key == 'date_ex'){
                                        dividend = {
                                            ...dividend,
                                            date_com: moment(field[word.key]).subtract(1,'day').toISOString()
                                        }
                                    }
                                }
                                dividend = {
                                    ...dividend,
                                    ...field
                                }
                            } catch(err){
                                console.error(err);
                                
                             }
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
    formatDate(word,value){
        let field = {}
        const regexp = new RegExp(`([0-3][0-9]).*(${months.map(month => month.label).join('|')}).*([0-9]{4})`)
        const dates = value.match(regexp)
        if(dates && dates.length > 0){
            const day = dates[1]
            const monthNumber = months.find((month)=> month.label == dates[2])
            let month = 0;
            if(monthNumber){
                month = months.find((month)=> month.label == dates[2]).format
            }
            const year = dates[3]
            field = {
                [word ? word.key : label]: new Date(year,month,day)
            }
        }
        return field
    }
    formatStockValues(word,firtColumn,secondColumn){
        let field = {}
        let [firstColumnValue,firstColumnStockType ] = firtColumn.match(/([0-9](,|),[0-9]+)|(PN|ON|UNIT)/gi)
        if(secondColumn){
            let [secondColumnValue,secondColumnStockType] = secondColumn.match(/([0-9],[0-9]+)|(PN|ON|UNIT)/gi)
            field = {
                [word ? word.key : label]: {
                    [firstColumnStockType ? firstColumnStockType : 'ON']: parseFloat(firstColumnValue.replace(',','.')),
                    [secondColumnStockType]:  parseFloat(secondColumnValue.replace(',','.'))
                }
            }
        }else{
            field = {
                [word ? word.key : label]:{ 
                    [firstColumnStockType ? firstColumnStockType : 'ON']:  parseFloat(firstColumnValue.replace(',','.')),
                }
            }
        }
        return field
    }
    async notifyNewDividends(to){
        try{
            const emailController = new EmailController()
            const dividends = await this.searchForDividends()
            const dividendsToNotify = dividends.filter((dividend)=>{
                return new Date(dividend.date_com).getTime() >= Date.now()
            }).map((dividend)=> {
                return {
                    ...dividend,
                    date_com: moment(dividend.date_com).format('L')
                }
            })
            const emailTemplate = await getDividendsTemplate(dividendsToNotify)
            const { subject, body} = emailTemplate
            return await emailController.send(to,subject,null,body)
        }catch(err){
            console.log("Notify new dividends =>",err)
            throw {code: err.code || 500}
        }
    }
}
