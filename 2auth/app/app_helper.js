var dirty = require('dirty');
var db = dirty('user.db');
const fs = require('fs');
var moment = require('moment');
var config = require('./config');
var uuid = require('uuid');
var validator = require('validator');
var nodemailer = require('nodemailer');


////////////////// MAIL HELPER /////////////////////////////////
//Send message
exports.mail_sendMessage = function(emailAddress, code, cb) {
    let transporter = nodemailer.createTransport(config.mail_server);
    transporter.sendMail(exports.mail_getOptions(config.mail_from, emailAddress, config.mail_title, config.mail_message_auth_url, code), (error, info) => {
        if (error) {
            console.log(error);
            cb(false);
            return;
        }
        console.log('Message sent: %s', info.messageId);
        cb(true);
    });
}

//Generating email
exports.mail_getOptions = function(from, to, subject, base_url, code) {
    return {
        from: from,
        to: to,
        subject: subject,
        html: `Use the link to get access: <a href=${base_url}/confirm/${code}>Click me</a>`
    };
}

//Email validation
exports.mail_validateEmail = function(email) {
    return validator.isEmail(email, {
        allow_utf8_local_part: false
    });
}

////////////////// DB HELPER /////////////////////////////////

exports.db_showall = function() {
    db.forEach(function(key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
}

exports.db_writeConfig = function() {
    let file_auth_content = '';
    db.forEach(function(key, val) {
        if (val.grant_permission == true) {
            file_auth_content = file_auth_content + `${key} 1;\n`;
            console.log('Content: %s', file_auth_content);
        }
    });

    //Write nginx config
    fs.writeFile(config.app_nginx_filename, file_auth_content, (err) => {
        if (err) console.log(`ERROR: nginx config not saved!`);
        console.log(`nginx config saved!`);
    });
    exports.db_showall();
}


exports.db_push = function(ip, grant_permission) {
    let code = uuid.v1();
    db.set(ip, {
        code,
        grant_permission,
        datetime: moment().format()
    }, function() {
        console.log('Code %s for IP address %s', code, ip);
    });
    return code;
}

exports.db_verifyCode = function(ip, code) {
    return (code == db.get(ip).code) && !db.get(ip).grant_permission;
}

exports.db_disableAccessCron = function() {
    db.forEach(function(key, val) {
        if (val.grant_permission == true) {
            if (moment().diff(val.datetime, 'minutes') > config.app_expire_time)
            //Generate a new uuid to disable reusing a link into mailbox
                exports.db_push(key, false)
            exports.db_writeConfig();
        }
    });
}

////////////////////// COMMON HELPER ////////////////////

//Find client IP address
exports.getClientIP = function(req) {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace(/^.*:/, '');
}
