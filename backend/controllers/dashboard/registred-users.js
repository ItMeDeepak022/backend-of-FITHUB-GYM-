const userauthModel = require("../../models/webModel/userModel/userauth.model")
const cloudinary = require("../../config/cloudinary");
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
        let { id } = req.params;

        let data = await userauthModel.findById(id);

        if (!data) {
            return res.send({
                status: false,
                message: "User not found"
            });
        }

        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id);
        }

        await userauthModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Registered User deleted successfully",
          
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
};

module.exports = { getuserRegistred, deleteRegistredUsers }