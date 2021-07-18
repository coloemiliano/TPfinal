const nodemailer = require('nodemailer')

const send = async(mail,asunto,cuerpo) => {
    try{
    const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.MAIL_USER || 'mail',
        pass: process.env.MAIL_PASSWORD || 'password',
         }
    });
    const info = {
        to: mail,
        subject: asunto,
        html: cuerpo,
    };
    const {messageId} = await transporter.sendMail(info);
    return messageId;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {send};