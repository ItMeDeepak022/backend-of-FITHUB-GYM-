let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    program: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userQuery', userSchema)