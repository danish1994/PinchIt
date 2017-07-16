var nodemailer = require('nodemailer');


module.exports = {
    sendMail: function(to, subject, mailText, mailHTML) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Pinch Social" <social@pinched.in>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: mailText, // plain text body
            html: mailHTML // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}
