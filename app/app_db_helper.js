var dirty = require('dirty');
var db = dirty('user.db');
const fs = require('fs');
var moment = require('moment');
var config = require('./config');
var uuid = require('uuid');

exports.showall = function() {
    db.forEach(function(key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
}

exports.writeConfig = function() {
    let file_auth_content = '';
    db.forEach(function(key, val) {
        if (val.grant_permission == true) {
            file_auth_content = file_auth_content + `${key} 1;\n`;
            console.log('Content: %s', file_auth_content);
        }
    });

    //Write nginx config
    fs.writeFile(config.nginx_filename, file_auth_content, (err) => {
        if (err) console.log(`ERROR: nginx/${config.nginx_filename} not saved!`);
        console.log(`nginx/${config.nginx_filename} saved!`);
    });
    exports.showall();
}


exports.push = function(ip, grant_permission) {
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

exports.verifyCode = function(ip, code) {
    return (code == db.get(ip).code) && !db.get(ip).grant_permission;
}

exports.disableAccessCron = function(min) {
    db.forEach(function(key, val) {
        if (val.grant_permission == true) {
            if (moment().diff(val.datetime, 'minutes') > config.expire_time)
            //Generate a new uuid to disable reusing a link into mailbox
                exports.push(key, false)
            exports.writeConfig();
        }
    });
}