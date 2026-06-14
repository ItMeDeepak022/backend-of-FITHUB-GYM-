let mongoose = require('mongoose')

let programSchema = new mongoose.Schema({
    programName: String,
    description: String,
    duration: String,
    price: String,
    programImg: String,
    public_id:String
})

module.exports=mongoose.model('programs',programSchema)