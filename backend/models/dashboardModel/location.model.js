let mongoose = require('mongoose')

const locoSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        openingTime: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        Address: {
            type: String,
            required: true,
            trim: true,
        },

        aboutgym: {
            type: String,
            required: true,
            trim: true,
        },

        locationurl: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

let locationModel = mongoose.model('location', locoSchema)


module.exports = locationModel


