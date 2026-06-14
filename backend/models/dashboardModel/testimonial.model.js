const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        testimonialImg: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: String,
            required: true,
        },

        program: {
            type: String,
            required: true,
            trim: true,
        },

        feedback: {
            type: String,
            required: true,
            trim: true,
        },
        public_id: String,
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("testimonial", testimonialSchema);