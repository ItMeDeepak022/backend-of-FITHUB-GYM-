const nodemailer = require('nodemailer')

const sendMail = async (subject, html,) => {

    let transporter = nodemailer.createTransport(
        {
            service: "gmail",
            // host: "smtp.gmail.com",
            // port:465,
            // secure:true, // Use true for port 465, false for port 587
            auth: {
                user: process.env.Email,
                pass: process.env.Pass
            }
        }
    )


    await transporter.sendMail({

        from: process.env.Email,
        to: process.env.Email,
        subject,
        html

    })


}


module.exports = { sendMail }