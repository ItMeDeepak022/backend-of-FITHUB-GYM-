let mongoose = require('mongoose')

let nutritionSchema = new mongoose.Schema({
    nutritionName: String,
    category: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    details: String,
    nutritionImg: String,
    public_id: String
})

module.exports = mongoose.model('nutritions', nutritionSchema)


