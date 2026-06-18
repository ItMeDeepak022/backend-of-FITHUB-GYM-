const userauthModel = require("../../models/webModel/userModel/userauth.model")
const cloudinary = require("../../config/cloudinary");
const subscriptionModel = require("../../models/webModel/userModel/subscription.model");

let getuserRegistred = async (req, res) => {

    let data = await userauthModel.find()
    res.send({
        status: true,
        message: 'Registerd User data fetched..',
        data
    })
}

let deleteRegistredUsers = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await userauthModel.findOne({ _id: id });


        if (!user) {
            return res.send({
                status: false,
                message: "User not found"
            });
        }

        // Delete cloudinary image
        if (user.public_id) {
            await cloudinary.uploader.destroy(user.public_id);
        }

        // Delete all subscriptions of user
        await subscriptionModel.deleteMany({
            userId: user._id
        });

        // Delete user
        await userauthModel.deleteOne({
            _id: user._id
        });

        return res.send({
            status: true,
            message: "User and subscriptions deleted successfully"
        });

    } catch (error) {

        return res.status(500).send({
            status: false,
            message: error.message
        });

    }
};

module.exports = { getuserRegistred, deleteRegistredUsers }