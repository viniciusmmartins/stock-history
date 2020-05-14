import moment from 'moment'
import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
moment.locale('pt-br')
export const getDividendsTemplate = async (dividends) => {
    let subject = `Dividendos da semana ${moment().format('L')}`
    let htmlFile = fs.readFileSync(path.join(__dirname, 'dividends.html'), 'utf8')
    let template = Handlebars.compile(htmlFile)
    let body = template( {dividends} )
    return { subject, body }
}
