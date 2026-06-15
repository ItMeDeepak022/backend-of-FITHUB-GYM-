const bcrypt = require('bcrypt');
const saltRounds = 10;
const authModel = require("../../../models/dashboardModel/auth.model")
let jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const cloudinary = require('../../../config/cloudinary');
const { sendMail } = require('../../../config/sendMailConfig');
let register = async (req, res) => {

    try {

        let { name, email, phone, gender, password } = req.body

        console.log(name, email, password);

        const hash = bcrypt.hashSync(password, salt);

        let obj = { name, email, phone, gender, password: hash }


        let checkEmail = await authModel.findOne({ email })

        if (checkEmail) {
            return res.send(
                {
                    status: false,
                    message: "Email Already Exists"
                }
            )
        }

        let checkphone = await authModel.findOne({ phone })

        if (checkphone) {
            res.send(
                {
                    status: false,
                    message: "Phone Number Already Exists"
                }
            )
        }


        let data = await authModel.create(obj)
        res.send(
            {
                status: true,
                message: "Sign Up completed now..",
                data
            }
        )
    }
    catch (err) {



        res.send(
            {
                status: false,
                error: err.message

            }
        )
    }
}

// let login = async (req, res) => {

//     let { email, password } = req.body

//     let checkEmail = await authModel.findOne({email})

//     if (!checkEmail) {
//         res.send(
//             {
//                 status: false,
//                 message: "Email doesn't exists"
//             }
//         )
//     }

//     else if (checkEmail) {


//         var token = jwt.sign({ userId: checkEmail._id }, process.env.Token_Key);

//         if (bcrypt.compareSync(password, checkEmail.password)) {

//             res.send(
//                 {
//                     status: true,
//                     message: "Welcome to signIn here..",
//                     token: token
//                 }
//             )
//         }
//         else {
//             res.send(
//                 {
//                     status:false,
//                     message: "invalid password"
//                 }
//             )
//         }
//     }
// }


let login = async (req, res) => {

    try {

        let { email, password } = req.body


        // Find User
        let checkEmail = await authModel.findOne({ email })


        // User Agent
        let userAgent = req.headers['user-agent']


        // Device Name
        let deviceName = "Unknown Device"


        // OnePlus
        if (userAgent.includes('ONEPLUS')) {

            deviceName = "OnePlus"
        }

        // Redmi
        else if (
            userAgent.includes('Redmi') ||
            userAgent.includes('Mi')
        ) {

            deviceName = "Redmi/Xiaomi"
        }

        // Samsung
        else if (userAgent.includes('Samsung')) {

            deviceName = "Samsung"
        }

        // iPhone
        else if (userAgent.includes('iPhone')) {

            deviceName = "iPhone"
        }

        // Vivo
        else if (userAgent.includes('Vivo')) {

            deviceName = "Vivo"
        }

        // Oppo
        else if (userAgent.includes('OPPO')) {

            deviceName = "Oppo"
        }

        // Realme
        else if (userAgent.includes('Realme')) {

            deviceName = "Realme"
        }

        // Android
        else if (userAgent.includes('Android')) {

            deviceName = "Android Phone"
        }

        // Windows
        else if (userAgent.includes('Windows')) {

            deviceName = "Windows Laptop"
        }


        // Browser
        let browser = req.useragent.browser

        // Operating System
        let os = req.useragent.os


        // IP Address
        let ip =
            req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress


        // Login Time
        let loginTime = new Date().toLocaleString()


        // Location
        let location = "Unknown Location"

        try {

            // Localhost Fix
            if (
                ip == '::1' ||
                ip == '127.0.0.1'
            ) {

                // Indian Public IP
                ip = '49.36.81.1'
            }

            let response = await axios.get(
                `http://ip-api.com/json/${ip}`
            )

            location =
                `${response.data.city},
                 ${response.data.regionName},
                 ${response.data.country}`

        }
        catch (err) {

            console.log(err)
        }



        // Email Not Found
        if (!checkEmail) {

            await sendMail(

                "Wrong Email Alert",

                `
        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8"/>

            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        </head>

        <body style="
            margin:0;
            padding:0;
            background:#f3f4f6;
            font-family:Arial,sans-serif;
        ">

            <div style="
                width:100%;
                padding:20px 10px;
                box-sizing:border-box;
            ">

                <div style="
                    max-width:650px;
                    margin:auto;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                    box-shadow:0 4px 15px rgba(0,0,0,0.1);
                ">

                    <!-- Header -->
                    <div style="
                        background:#dc2626;
                        padding:30px 20px;
                        text-align:center;
                        color:white;
                    ">

                        <h1 style="
                            margin:0;
                            font-size:28px;
                        ">
                            Security Alert
                        </h1>

                        <p style="
                            margin-top:10px;
                            font-size:15px;
                        ">
                            Wrong Email Attempt
                        </p>

                    </div>


                    <!-- Body -->
                    <div style="
                        padding:25px 18px;
                    ">

                        <h2 style="
                            color:#dc2626;
                            margin-top:0;
                            font-size:24px;
                        ">
                            Wrong Email ❌
                        </h2>

                        <p style="
                            color:#4b5563;
                            line-height:24px;
                            font-size:15px;
                        ">
                            Someone entered wrong email in your dashboard account.
                        </p>


                        <!-- Table -->
                        <table style="
                            width:100%;
                            border-collapse:collapse;
                            margin-top:20px;
                            word-break:break-word;
                        ">

                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    width:38%;
                                    font-size:14px;
                                ">
                                    Email
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${email}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    font-size:14px;
                                ">
                                    Device
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${deviceName}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    font-size:14px;
                                ">
                                    Browser
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${browser}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    font-size:14px;
                                ">
                                    OS
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${os}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    font-size:14px;
                                ">
                                    Location
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${location}
                                </td>

                            </tr>


                            <tr>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    font-size:14px;
                                ">
                                    Time
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${loginTime}
                                </td>

                            </tr>

                        </table>


                        <!-- Alert Box -->
                        <div style="
                            margin-top:22px;
                            background:#fee2e2;
                            padding:16px;
                            border-radius:10px;
                            color:#991b1b;
                            font-size:14px;
                            line-height:22px;
                        ">

                            If this was not you, secure your account immediately.

                        </div>

                    </div>


                    <!-- Footer -->
                    <div style="
                        background:#111827;
                        padding:18px;
                        text-align:center;
                        color:#d1d5db;
                        font-size:13px;
                    ">

                        © 2026 Gym Dashboard | Security Team

                    </div>

                </div>

            </div>

        </body>

        </html>
        `
            )

            return res.send({
                status: false,
                message: "Email doesn't exists"
            })
        }



        // Password Check
        let checkPassword = bcrypt.compareSync(
            password,
            checkEmail.password
        )


        // Wrong Password
        if (!checkPassword) {

            await sendMail(

                "Wrong Password Alert",

                `
        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8"/>

            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        </head>

        <body style="
            margin:0;
            padding:0;
            background:#f3f4f6;
            font-family:Arial,sans-serif;
        ">

            <div style="
                width:100%;
                padding:20px 10px;
                box-sizing:border-box;
            ">

                <div style="
                    max-width:650px;
                    margin:auto;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                    box-shadow:0 4px 15px rgba(0,0,0,0.1);
                ">

                    <!-- Header -->
                    <div style="
                        background:#dc2626;
                        padding:30px 20px;
                        text-align:center;
                        color:white;
                    ">

                        <h1 style="
                            margin:0;
                            font-size:30px;
                        ">
                            Security Alert
                        </h1>

                        <p style="
                            margin-top:10px;
                            font-size:15px;
                        ">
                            Wrong Password Attempt
                        </p>

                    </div>


                    <!-- Body -->
                    <div style="
                        padding:25px 20px;
                    ">

                        <h2 style="
                            color:#dc2626;
                            margin-top:0;
                            font-size:24px;
                        ">
                            Wrong Password ⚠️
                        </h2>

                        <p style="
                            color:#4b5563;
                            line-height:24px;
                            font-size:15px;
                        ">
                            Someone entered wrong password in your account.
                        </p>


                        <!-- Table -->
                        <table style="
                            width:100%;
                            border-collapse:collapse;
                            margin-top:20px;
                            word-break:break-word;
                        ">

                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                    width:40%;
                                ">
                                    Email
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${email}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                ">
                                    Device
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${deviceName}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                ">
                                    Browser
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${browser}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                ">
                                    OS
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${os}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                ">
                                    Location
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${location}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    background:#f9fafb;
                                    font-weight:bold;
                                ">
                                    Time
                                </td>

                                <td style="
                                    padding:12px;
                                    border:1px solid #e5e7eb;
                                    font-size:14px;
                                ">
                                    ${loginTime}
                                </td>
                            </tr>

                        </table>


                        <!-- Alert -->
                        <div style="
                            margin-top:25px;
                            background:#fee2e2;
                            padding:18px;
                            border-radius:10px;
                            color:#991b1b;
                            font-size:14px;
                            line-height:22px;
                        ">

                            If this was not you, please change your password immediately.

                        </div>

                    </div>


                    <!-- Footer -->
                    <div style="
                        background:#111827;
                        padding:18px;
                        text-align:center;
                        color:#d1d5db;
                        font-size:13px;
                    ">

                        © 2026 Gym Dashboard | Security Team

                    </div>

                </div>

            </div>

        </body>

        </html>
        `
            )

            return res.send({
                status: false,
                message: "invalid password"
            })
        }



        // JWT Token
        var token = jwt.sign(
            { userId: checkEmail._id },
            process.env.Token_Key
        )



        // Login Success
        await sendMail(

            "Login Success",


            `
    <!DOCTYPE html>

    <html>

    <head>

        <meta charset="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    </head>

    <body style="
        margin:0;
        padding:0;
        background:#f3f4f6;
        font-family:Arial,sans-serif;
    ">

        <div style="
            width:100%;
            padding:20px 10px;
            box-sizing:border-box;
        ">

            <div style="
                max-width:650px;
                margin:auto;
                background:#ffffff;
                border-radius:16px;
                overflow:hidden;
                box-shadow:0 4px 15px rgba(0,0,0,0.1);
            ">

                <!-- Header -->
                <div style="
                    background:#2563eb;
                    padding:30px 20px;
                    text-align:center;
                    color:white;
                ">

                    <h1 style="
                        margin:0;
                        font-size:30px;
                    ">
                        Gym Dashboard
                    </h1>

                    <p style="
                        margin-top:10px;
                        font-size:15px;
                    ">
                        Security Login Alert
                    </p>

                </div>


                <!-- Body -->
                <div style="
                    padding:25px 20px;
                ">

                    <h2 style="
                        color:#16a34a;
                        margin-top:0;
                        font-size:24px;
                    ">
                        Login Successful ✅
                    </h2>

                    <p style="
                        color:#4b5563;
                        line-height:24px;
                        font-size:15px;
                    ">
                        A new login was detected in your account.
                    </p>


                    <!-- Details -->
                    <table style="
                        width:100%;
                        border-collapse:collapse;
                        margin-top:20px;
                        word-break:break-word;
                    ">

                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                                width:40%;
                            ">
                                Email
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${email}
                            </td>
                        </tr>


                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                            ">
                                Device
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${deviceName}
                            </td>
                        </tr>


                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                            ">
                                Browser
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${browser}
                            </td>
                        </tr>


                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                            ">
                                OS
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${os}
                            </td>
                        </tr>


                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                            ">
                                Location
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${location}
                            </td>
                        </tr>


                        <tr>
                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                background:#f9fafb;
                                font-weight:bold;
                            ">
                                Time
                            </td>

                            <td style="
                                padding:12px;
                                border:1px solid #e5e7eb;
                                font-size:14px;
                            ">
                                ${loginTime}
                            </td>
                        </tr>

                    </table>


                    <!-- Alert -->
                    <div style="
                        margin-top:25px;
                        background:#fef3c7;
                        padding:18px;
                        border-radius:10px;
                        color:#92400e;
                        font-size:14px;
                        line-height:22px;
                    ">

                        If this was not you, please change your password immediately.

                    </div>

                </div>


                <!-- Footer -->
                <div style="
                    background:#111827;
                    padding:18px;
                    text-align:center;
                    color:#d1d5db;
                    font-size:13px;
                ">

                    © 2026 Gym Dashboard | Security Team

                </div>

            </div>

        </div>

    </body>

    </html>
    `
        )



        // Success Response
        return res.send({
            status: true,
            message: "Welcome to signIn here..",
            token: token
        })

    }
    catch (err) {

        res.send({
            status: false,
            error: err.message
        })
    }
}


let getAdminprofile = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;
    let data = await authModel.findOne({ _id: userId })
    res.send({
        status: true,
        message: 'Admin profile fetched...',
        data
    })
}


let changepassword = async (req, res) => {

    let { current, confirm, newpassword } = req.body

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;

    let data = await authModel.findOne({ _id: userId })



    if (data) {

        let dbpassword = await data.password;

        if (bcrypt.compareSync(current, dbpassword)) {
            if (confirm === newpassword) {

                const hash = bcrypt.hashSync(confirm, saltRounds);

                let obj = {
                    password: hash
                }

                let data = await authModel.updateOne({ _id: userId },
                    {
                        $set: obj
                    }
                )

                res.send({
                    status: true,
                    message: 'Admin password changed successfully...'
                })
            }
            else {
                res.send({
                    status: false,
                    message: 'password not matched..'
                })
            }
        }
        else {
            return res.send({
                status: false,
                message: 'Invalid Current password..'
            })
        }
    }
    else {
        res.send({
            status: false,
            message: 'user not founds..'
        })
    }


}


let editAdminprofile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;
    let insertObj = { ...req.body }

    let oldData = await authModel.findById(userId)

    if (req.file) {
        if (oldData.public_id) {
            await cloudinary.uploader.destroy(oldData.public_id)
        }
        insertObj.profileImg = req.file.path,
            insertObj.public_id = req.file.filename
    }

    let data = await authModel.updateOne({ _id: userId },
        {
            $set: insertObj
        }
    )
    res.send({
        status: true,
        message: 'Admin profile data updated...'
    })
}


let securityToken = async (req, res) => {

    res.send({
        status: true,
        message: "token varified successfull",
    });

}





module.exports = {
    register, login, securityToken,
    getAdminprofile, changepassword, editAdminprofile
}