var validator = require('validator');
var config = require('./config');
var nodemailer = require('nodemailer');


exports.sendEmail = function(emailAddress, code) {
    let transporter = nodemailer.createTransport(config.mail_server);
    transporter.sendMail(exports.getMailOptions(config.mail_from, emailAddress, config.mail_title, config.base_url, code), (error, info) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Message sent: %s', info.messageId);
     
    });
    return true;
}

exports.getClientIP = function(req) {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace(/^.*:/, '');
}

exports.getMailOptions = function(from, to, subject, base_url, code) {
    return {
        from: from,
        to: to,
        subject: subject,
        html: `Use the link to get access: <a href=${base_url}/confirm/${code}>Click me</a>`
    };
}

exports.validateEmail = function(email) {
    return validator.isEmail(email, {
        allow_utf8_local_part: false
    });
}