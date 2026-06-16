var jwt = require('jsonwebtoken')
const Razorpay = require('razorpay');
const crypto = require('crypto');
const subscriptionModel = require('../../../models/webModel/userModel/subscription.model');




var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});




let createOrder = async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.Token_Key);
        const { userId } = decoded;

        let subscriptionObj = { ...req.body, userId };

        // const start = new Date(subscriptionObj.startDate);

        // const end = new Date(start);

        // end.setMonth(end.getMonth() + Number(subscriptionObj.duration));
        // subscriptionObj.endDate = end

        const start = new Date(subscriptionObj.startDate);

        const months = parseInt(subscriptionObj.duration);

        if (isNaN(months)) {
            return res.send({
                status: false,
                message: "Invalid duration"
            });
        }

        if (isNaN(start.getTime())) {
            return res.send({
                status: false,
                message: "Invalid start date"
            });
        }

        const end = new Date(start);

        end.setMonth(end.getMonth() + months);

        subscriptionObj.endDate = end;

        // CASH PAYMENT
        if (subscriptionObj.paymentMethod === "cash") {

            subscriptionObj.paymentStatus = "Pending";
            subscriptionObj.userId = userId;

            const subscriptionData =
                await subscriptionModel.create(subscriptionObj);

            return res.send({
                status: true,
                message: "Membership Activated",
                subscriptionData
            });
        }

        // UPI PAYMENT
        if (subscriptionObj.paymentMethod === "UPI") {

            subscriptionObj.paymentStatus = "Started";

            const subscriptionData =
                await subscriptionModel.create(subscriptionObj);

            const order = await instance.orders.create({
                amount: subscriptionObj.total * 100,
                currency: "INR",
                // receipt: subscriptionData._id.toString()
            });

            await subscriptionModel.updateOne(
                { _id: subscriptionData._id },
                {
                    $set: {
                        razorpayOrderId: order.id,
                        userId,
                    }
                }
            );

            return res.send({
                status: true,
                razorpay_Order: order,
                subscriptionData
            });
        }

    } catch (error) {

        res.send({
            status: false,
            message: error.message
        });
    }
};

let verifyPayment = async (req, res) => {

    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;



    let sign = razorpay_order_id + "|" + razorpay_payment_id;

    let expectedSign = crypto
        .createHmac('sha256', '2zVhqdW5eH53pOyBvinKiAVF')
        .update(sign)
        .digest('hex');

    await subscriptionModel.findOne()

    if (expectedSign === razorpay_signature) {

        await subscriptionModel.updateOne(
            { razorpayOrderId: razorpay_order_id },
            {
                $set: {
                    paymentStatus: "Success",
                    razorpayPaymentId: razorpay_payment_id,

                }
            }
        );

        res.send({
            message: "Payment verified successfully",
            status: true,
        })

    } else {

        res.send({
            message: "Invalid signature",
            status: false
        })
    }
}

let getSubscription = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.Token_Key);
    const { userId } = decoded;
    let obj = { userId, paymentStatus: 'Success' }
    let data = await subscriptionModel.find(obj)
    res.send({
        status: true,
        message: "Subscription fetched Successfully",
        data,

    })


}






module.exports = { createOrder, getSubscription, verifyPayment }