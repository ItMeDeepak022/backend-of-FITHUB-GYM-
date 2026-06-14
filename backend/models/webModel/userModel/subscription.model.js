let mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String,
    state: String,
    zip: String,
    membership: String,
    total: String,
    duration: String,
    price: Number,

    paymentMethod: {
        type: String,
        enum: ["UPI", "cash"],
        required: true
    },
    startDate:Date,
    endDate: Date,
    subscriptionId: String,
    paymentStatus: {
        type: String,
        enum: ['Started', "Pending", "Success", "Failed"],
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-authentication"
    }
}, { timestamps: true });

module.exports = mongoose.model('subscription-data', subscriptionSchema)

