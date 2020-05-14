import nodemailer from 'nodemailer'
import { getDividendsTemplate } from '../../templates/emails'


export class EmailController {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'othecos@gmail.com',
                pass: 'atyuofbflofpvzgb'
            }
        })
    }
   
    async send(to,subject = 'Sem titulo',text,html) {
       
        let mail = {
            to,
            from: 'othecos@gmail.com',
            subject,
        }
        if(html) mail['html'] = html
        else if(text) mail['text'] = text ? text : ''
        console.log(mail)
        return new Promise((resolve,reject)=>{
            this.transporter.sendMail(mail, (error, info) =>{
                if (error) {
                    reject(error);
                } else {
                    resolve('Email sent: ' + info.response);
                }
            });
        })
        
    }
}
