const nodemailer = require('nodemailer')
const config = require("../../config")
module.exports =  (option) => {
    let options = option || config.email
    var transporter = nodemailer.createTransport({
        service: options.platform,
        auth: {
            user: options.user,
            pass: options.pass
        }
    });
    var mailOptions = {
        from: options.user,
        to:"1143057710@qq.com",
        subject: '测试邮件',
        text: 'Nodejs之邮件发送',
        html:"<h2>GitHub，。https://github.com/zlongCoding/novel_node</h2>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            console.log("success")
        }else{
            console.log(error)
        }
    });

};