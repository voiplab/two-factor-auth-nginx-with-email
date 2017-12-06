module.exports = {
    domain: "yourdomain.com",
    title: "Restricted area",
    base_url: "http://auth.yourdomain.com",
    mail_from: "Secure <auth@yourdomain.com>",
    mail_title: "Verification code",
    mail_server: {
        host: '192.168.0.24',
        port: 25,
        secure: false // true for 465, false for other ports
    },
    message_confirm_success: "Let's rock",
    message_confirm_fail: "Oops... Invalid IP address or verification code.",
    message_validator_email_error: "Email address is not valid",
    message_send_mail_failed: "Somethings went wrong while sending email. Please try again later",
    expire_time: 60, //in minutes
    nginx_filename: 'dynamic.conf',
};