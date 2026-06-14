const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        mobileNumber: {
            type: String,
            required: [true, "Mobile Number is required"],
            trim: true,
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female", "Other"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        profileImg:String,
        about:String,
        public_id: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user-authentication", userSchema);