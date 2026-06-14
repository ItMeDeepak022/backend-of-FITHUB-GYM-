const subscriptionModel = require("../../../models/webModel/userModel/subscription.model");
let jwt = require('jsonwebtoken')
let showHistroy = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;

    let data = await subscriptionModel.find({ userId })

    return res.send({
        status: true,
        message: 'Histroy data fetched...',
        data
    });
}

module.exports = { showHistroy }