var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "server7.dhakawebhost.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'eventfly@buetcsefest2022.com', // generated ethereal user
      pass: 'eventfly@2022', // generated ethereal password
    },
  });

// const mailOptions = {
//     from: 'thr0m3l@gmail.com', // sender address
//     to: 'true@true.com', // list of receivers
//     subject: 'test mail', // Subject line
//     html: '<h1>this is a test mail.</h1>'// plain text body
// };


const sendMail = async (mailOptions : any) => {
    transporter.sendMail(mailOptions, function (err:any, info:any) {
        if(err)
            console.log(err)
        else
            console.log(info);
    })
}

export { sendMail }



