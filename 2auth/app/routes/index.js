var validator = require('validator');
var config = require('../config');
var express = require('express');
var router = express.Router();
var dirty = require('dirty');
var db = dirty('user.db');
var helper = require('../app_helper');

/* GET home page. */
router.get('/', function(req, res, next) {
    let ip = helper.getClientIP(req);
    res.render('index', {
        title: config.ui_title,
        domain: config.ui_domain,
        ip_address: ip
    });
});

router.post('/', function(req, res, next) {
    let mailbox = req.body.mailbox.concat('@' + config.ui_domain);

    if (helper.mail_validateEmail(mailbox)) {
        let ip = helper.getClientIP(req);
        let code = helper.db_push(ip, false);

        helper.mail_sendMessage(mailbox, code, sent => {
            if (sent) {
                res.render('index', {
                    title: config.ui_title,
                    maillink: config.ui_mail_link,
                    mailbox: mailbox
    
                });
            } else {
                res.render('message', {
                    title: config.ui_title,
                    message: config.ui_message_send_mail_failed
                });
            }
        });
    } else {
        res.render('message', {
            title: config.company_name,
            message: config.ui_message_validator_email_error
        });
    }
});

router.get('/confirm/:code', function(req, res, next) {
    let code = req.params['code'];
    let ip = helper.getClientIP(req);

    //Request IP address should equal IP address code confirmation
    if (helper.db_verifyCode(ip, code)) {
        //Adding to white list
        helper.db_push(ip, true);
        helper.db_writeConfig();
        res.render('message', {
            title: config.ui_title,
            message: config.ui_message_confirm_success
        });
    } else {
        res.render('message', {
            title: config.ui_title,
            message: config.ui_message_confirm_fail
        });
    }
});

module.exports = router;