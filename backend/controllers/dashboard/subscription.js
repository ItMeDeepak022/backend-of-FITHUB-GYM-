const subscriptionModel = require("../../models/webModel/userModel/subscription.model")

let getAllmember = async (req, res) => {

    let data = await subscriptionModel.find()
    res.send({
        status: true,
        message: 'All Subscription data fetched...',
        data
    })
}

let datadelete = async (req, res) => {
    let { id } = req.params;

    let data = await subscriptionModel.deleteOne({ _id: id })
    res.send({
        status: true,
        message: 'Subscription data deleted...',
        data
    })
}

module.exports={
    getAllmember,
    datadelete
}