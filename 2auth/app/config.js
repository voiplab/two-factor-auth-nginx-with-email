module.exports = {
    //Common settings
    ui_domain: "muranosoft.com", //send email to @yourdomain.com
    ui_title: "Wellcome to meetup", //General title
    ui_mail_link: "http://email.muranosoft.com",
    //Common messages
    ui_message_confirm_success: "Let's rock",
    ui_message_confirm_fail: "Oops... Invalid IP address or verification code.",
    ui_message_validator_email_error: "Email address is not valid",
    ui_message_send_mail_failed: "Somethings went wrong while sending email. Please try again later",
    //Mail configuration
    mail_message_auth_url: "http://auth.yourdomain.com", //Base url in sending link
    mail_from: "2Auth <2auth@muranosoft.com>", 
    mail_title: "Verification Code",
    //Examples https://nodemailer.com/about/
    mail_server: {
        host: '192.168.0.24',
        port: 25,
        secure: false // true for 465, false for other ports
    },
    //App settings
    app_expire_time: 1, //time in minutes
    app_nginx_filename: 'dynamic.conf', //filename should be included in nginx configs
};