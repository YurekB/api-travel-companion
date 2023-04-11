"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var log_1 = require("./log");
require('dotenv').config();
var mailgun = require("mailgun-js")({
    apiKey: "".concat(process.env.MG_KEY),
    domain: "".concat(process.env.MG_DOMAIN),
    host: "api.eu.mailgun.net",
});
var sendEmail = function (receiverEmail, subject, html, text, attachments, url) {
    var fromUrl = "".concat(process.env.NO_REPLY_EMAIL);
    return new Promise(function (resolve, reject) {
        mailgun.messages().send({
            from: fromUrl,
            to: receiverEmail,
            subject: subject,
            html: html,
            text: text,
            attachment: attachments,
            url: url
        })
            .then(function (msg) {
            console.log("Email Sent");
            resolve(msg);
        })
            .catch(function (err) {
            console.log("EMAIL CATCH ERROR:", err);
            (0, log_1.accessLog)("EMAIL CATCH ERROR:", err);
            reject(err);
        });
    });
};
exports.sendEmail = sendEmail;
