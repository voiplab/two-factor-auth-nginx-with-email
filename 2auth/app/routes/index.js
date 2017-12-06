var validator = require('validator');
var config = require('../config');
var express = require('express');
var router = express.Router();
var dirty = require('dirty');
var db = dirty('user.db');
var helper = require('../app_helper');
var db_helper = require('../app_db_helper');

/* GET home page. */
router.get('/', function(req, res, next) {
    let ip = helper.getClientIP(req);
    res.render('index', {
        title: config.title,
        domain: config.domain,
        ip_address: ip
    });
});

router.post('/', function(req, res, next) {
    let mailbox = req.body.mailbox.concat('@' + config.domain);

    if (helper.validateEmail(mailbox)) {
        let ip = helper.getClientIP(req);
        let code = db_helper.push(ip, false);

        if (helper.sendEmail(mailbox, code)) {
            res.render('index', {
                title: config.title,
                mailbox: mailbox
            });
        } else {
            res.render('message', {
                title: config.title,
                message: config.message_send_mail_failed
            });
        }
    } else {
        res.render('message', {
            title: config.company_name,
            message: config.message_validator_email_error
        });
    }
});

router.get('/confirm/:code', function(req, res, next) {
    let code = req.params['code'];
    let ip = helper.getClientIP(req);

    //Проверяем что код соответствует IP, с которого приходил запрос
    if (db_helper.verifyCode(ip, code)) {
        //Adding to white list
        db_helper.push(ip, true);
        db_helper.writeConfig();
        res.render('message', {
            title: config.title,
            message: config.message_confirm_success
        });
    } else {
        res.render('message', {
            title: config.title,
            message: config.message_confirm_fail
        });
    }
});

module.exports = router;