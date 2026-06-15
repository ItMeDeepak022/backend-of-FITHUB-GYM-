const nodemailer = require('nodemailer')

const sendMail = async (subject, html,) => {

    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port:587,
            secure:false, // Use true for port 465, false for port 587
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


module.exports= {sendMail}