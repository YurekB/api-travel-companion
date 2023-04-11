import { accessLog } from "./log";

require('dotenv').config();

const mailgun = require("mailgun-js")({
    apiKey: `${process.env.MG_KEY}`,
    domain: `${process.env.MG_DOMAIN}`,
    host: "api.eu.mailgun.net",
});
  

export const sendEmail = (receiverEmail:string, subject:string, html:any, text:string, attachments:any, url:string|null) => {
    
    let fromUrl = `${process.env.NO_REPLY_EMAIL}`;

    return new Promise((resolve, reject) => {
        mailgun.messages().send({
            from: fromUrl,
            to: receiverEmail,
            subject: subject,
            html: html,
            text: text,
            attachment: attachments,
            url: url
        })
        .then((msg:object) => {
            console.log("Email Sent");
            resolve(msg)
        }) 
        .catch((err:object) => { 
            console.log("EMAIL CATCH ERROR:", err)
            accessLog("EMAIL CATCH ERROR:", err)  

            reject(err);
        });
    })
}


