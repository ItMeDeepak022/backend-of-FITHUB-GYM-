const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmailQuery = async ({ to, subject, html }) => {
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: Array.isArray(to) ? to : [to],
            subject,
            html
        })

        console.log("Email Sent Successfully", result)  
        return result

    } catch (err) {
        console.error("Email Error =>", err)  
    }
}

module.exports = { sendEmailQuery }