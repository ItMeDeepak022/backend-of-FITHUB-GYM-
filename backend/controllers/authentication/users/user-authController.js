const bcrypt = require('bcrypt');
const userauthModel = require('../../../models/webModel/userModel/userauth.model');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cloudinary = require('../../../config/cloudinary')
let userRegistration = async (req, res) => {

    let { name, email, mobileNumber, gender, password } = req.body

    let match = await userauthModel.findOne({ email })

    if (match) {

        return res.send({
            status: false,
            message: 'Email allready existing..',
        })
    }

    const hash = bcrypt.hashSync(password, saltRounds);

    let obj = {
        name,
        email,
        mobileNumber,
        gender,
        password: hash
    }

    let data = await userauthModel.create(obj)

    res.send({
        status: true,
        message: 'Registration Successfull..',
        data
    })



}

let userLogin = async (req, res) => {

    let { email, password } = req.body

    let match = await userauthModel.findOne({ email })

    if (match) {
        let dbpassword = match.password
        if (bcrypt.compareSync(password, dbpassword)) {
            const token = jwt.sign({ userId: match._id }, process.env.Token_Key);
            return res.send({
                status: true,
                message: 'login successfully..',
                userName: match.name,
                token
            })
        }
        else {
            return res.send({
                status: false,
                message: 'Invalid password hai bsdke...'
            })
        }


    }

    else {

        return res.send({
            status: false,
            message: "Account doesn't exit's.."
        })
    }

}

let checkExitoken = async (req, res) => {

    res.send({
        status: true,
        message: "token varified successfull",
    });

}

let getprofile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;
    let data = await userauthModel.findOne({ _id: userId })
    res.send({
        status: true,
        message: 'user profile fetched...',
        url: process.env.Imgurl,
        data
    })
}

let editprofile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;
    let insertObj = { ...req.body }

    let oldData = await userauthModel.findById(userId)

    if (req.file) {
        if (oldData.public_id) {
            await cloudinary.uploader.destroy(oldData.public_id)
        }
        insertObj.profileImg = req.file.path,
            insertObj.public_id = req.file.filename
    }

    let data = await userauthModel.updateOne({ _id: userId },
        {
            $set: insertObj
        }
    )
    res.send({
        status: true,
        message: 'profile data updated...'
    })
}

let changepassword = async (req, res) => {

    let { currentpassword, confirmpassword, newpassword } = req.body

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;

    let data = await userauthModel.findOne({ _id: userId })

    

    if (data) {

        let dbpassword = await data.password

        if (bcrypt.compareSync(currentpassword, dbpassword)) {
            if (confirmpassword === newpassword) {

                const hash = bcrypt.hashSync(confirmpassword, saltRounds);

                let obj = {
                    password: hash
                }

                let data = await userauthModel.updateOne({ _id: userId },
                    {
                        $set: obj
                    }
                )

                res.send({
                    status: true,
                    message: 'user password changed successfully...'
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

module.exports = {
    userRegistration, userLogin,
    editprofile, checkExitoken, getprofile, changepassword
}