
const { sendEmailQuery } = require("../../config/emailconfig");
const userqueryModel = require("../../models/dashboardModel/userquery.model")

let addQuery = async (req, res) => {

    const { name, email, phone, program, message } = req.body

    let obj = { name, email, program, message, phone }

    // Admin Email Notification
    const adminTemplate = `
<div style="max-width:650px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#111827;padding:25px;text-align:center;">
        <img 
    src="https://fithubgymapplication.vercel.app/Img/logo.png"
    alt="Fithub GYM"
    style="
        display:block;
        width:180px;
        max-width:100%;
        margin:0 auto;
    "
/>

        <h1 style="color:#fff;margin:15px 0 5px;">
            Fithub GYM
        </h1>

        <p style="color:#d1d5db;margin:0;">
            New Enquiry Received
        </p>
    </div>

    <div style="padding:[20px_0px];">

        <h2 style="color:#111827;padding-left:10px">
            📩 New Customer Enquiry
        </h2>

        <p style="color:#6b7280;padding-left:10px">
            A new enquiry has been submitted through the Fithub GYM website.
        </p>

        <table width="100%" cellpadding="5" style="border-collapse:collapse;margin-top:20px;">
            <tr style="background:#f3f4f6;">
                <td><strong>Name</strong></td>
                <td>${name}</td>
            </tr>

            <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
            </tr>

            <tr style="background:#f3f4f6;">
                <td><strong>Phone</strong></td>
                <td>${phone}</td>
            </tr>

            <tr>
                <td><strong>Program</strong></td>
                <td>${program}</td>
            </tr>

            <tr style="background:#f3f4f6;">
                <td><strong>Message</strong></td>
                <td>${message}</td>
            </tr>
        </table>

        <div style="margin-top:25px;padding:15px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;">
            Please contact this lead as soon as possible.
        </div>

    </div>

</div>
`;
    // User Email Notifications
    const userTemplate = `
<div style="max-width:650px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:black;padding:10px;text-align:center;">

       <img 
    src="https://fithubgymapplication.vercel.app/Img/logo.png"
    alt="Fithub GYM"
    style="
        display:block;
        width:180px;
        max-width:100%;
        
        margin:0 auto;
    "
/>

        <h1 style="color:white;margin:15px 0 0;">
            Fithub GYM
        </h1>

        <p style="color:#d1d5db;">
            Transform Your Body, Transform Your Life
        </p>

    </div>

    <div style="padding:30px;">

        <h2 style="color:#111827;">
            Thank You, ${name}! 🎉
        </h2>

        <p style="color:#4b5563;font-size:16px;">
            We have successfully received your enquiry and appreciate your interest in joining Fithub GYM.
        </p>

        <p style="color:#4b5563;font-size:16px;">
            Our team will contact you shortly regarding
            <strong>${program}</strong>.
        </p>

        <div style="background:#f9fafb;padding:20px;border-radius:12px;margin-top:25px;">

            <h3 style="margin-top:0;color:#111827;">
                Your Submitted Details
            </h3>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Program:</strong> ${program}</p>
            <p><strong>Message:</strong> ${message}</p>

        </div>

        <div style="margin-top:25px;padding:18px;background:#ecfdf5;border-left:4px solid #10b981;border-radius:8px;">
            ✅ Our fitness consultant will get in touch with you soon.
        </div>

        <div style="margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px;">

            <h3 style="margin:0;color:#111827;">
                Fithub GYM
            </h3>

            <p style="margin:8px 0;color:#6b7280;">
                📞 +91 1234567890
            </p>

            <p style="margin:8px 0;color:#6b7280;">
                📧 support@fithubgym.com
            </p>

            <p style="margin:8px 0;color:#6b7280;">
                Thank you for choosing Fithub GYM 💪
            </p>

        </div>

    </div>

</div>
`;

    // Admin Email
    await sendEmailQuery({
        to: 'stylishboy3404@gmail.com',
        subject: `New Enquiry from ${name}`,
        html: adminTemplate,
    });

    // Admin Email
    await sendEmailQuery({
        to:'stylishboy3404@gmail.com',
        subject: "We Have Received Your Enquiry",
        html: userTemplate,
    });

    let data = await userqueryModel.create(obj)

    res.send({
        status: true,
        message: 'Message sent successfully...',
        data
    })
}

let getQuery = async (req, res) => {

    let data = await userqueryModel.find()
    res.send({
        status: true,
        message: 'fected all  queries..',
        data
    })
}

let deleteQuery = async (req, res) => {
    let { id } = req.params;

    let data = await userqueryModel.deleteOne({ _id: id })

    res.send({
        status: true,
        message: 'Query deleted successfully..',
        data
    })

}


 




module.exports = { addQuery, getQuery, deleteQuery }