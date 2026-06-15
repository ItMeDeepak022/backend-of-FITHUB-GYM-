const nodemailer = require('nodemailer')

const sendEmailQuery = async ({ to, subject, html }) => {

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.Email,
                pass: process.env.Pass
            }
        })

        // SMTP connection test
        await transporter.verify()
        console.log("SMTP Connected")

        await transporter.sendMail({
            from: process.env.Email,
            to,
            subject,
            html
        })

        console.log("Email Sent Successfully")

    } catch (err) {
        console.log("SMTP / Email Error =>", err)
    }

}

module.exports = { sendEmailQuery }