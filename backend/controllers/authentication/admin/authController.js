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

        // Email Not Found
        if (!checkEmail) {

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