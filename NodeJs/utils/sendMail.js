const nodemailer = require('nodemailer');  
   
const transporter = nodemailer.createTransport({  
    service: 'qq',  
    auth: {  
        user: '1718689673@qq.com', // 你的邮箱地址  
        pass: 'tdxkwjzuobzwcfcc'   // 你的邮箱密码或应用专用密码  
    }  
});  
  
// 发送验证码邮件  
async function sendVerificationEmail(toEmail, code) {  
    let info = await transporter.sendMail({  
        from: '"Your Name" <1718689673@qq.com>', // 发件人地址  
        to: toEmail, // 收件人地址  
        subject: "Your Verification Code", // 邮件主题  
        text: `Your verification code is: ${code}`, // 邮件正文  
        html: `<b>Your verification code is: ${code}</b>` // 可选的 HTML 格式邮件正文  
    });  
    
    console.log("Message sent: %s", info.messageId);  
}  


module.exports = {
    sendVerificationEmail
}