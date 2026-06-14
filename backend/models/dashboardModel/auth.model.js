let mongoose = require('mongoose')

let authSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        profileImg: String,
        phone: Number,
        aboutAdmin: String,
        public_id:String
    }
)

module.exports = mongoose.model('admin-authentication', authSchema)