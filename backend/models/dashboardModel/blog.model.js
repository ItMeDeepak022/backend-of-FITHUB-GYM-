
let mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        blogImg: {
            type: String,
            required: true,
        },

        blogContent: {
            type: String,
            required: true,
        },

        authorName: {
            type: String,
            required: true,
        },
        public_id: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);