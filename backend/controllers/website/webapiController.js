const blogModel = require("../../models/dashboardModel/blog.model")
const faqModel = require("../../models/dashboardModel/faq.model")
const locationModel = require("../../models/dashboardModel/location.model")
const nutritionMode = require("../../models/dashboardModel/nutrition.mode")
const programModel = require("../../models/dashboardModel/programModel")
const testimonialModel = require("../../models/dashboardModel/testimonial.model")

let fetchprogram = async (req, res) => {

    let data = await programModel.find()
    res.send(
        {
            status: true,
            message: 'program data fetched...',
            data
        }
    )
}
let fetchnutrition = async (req, res) => {

    let data = await nutritionMode.find()
    res.send(
        {
            status: true,
            message: 'nutrition data fetched...',
            data
        }
    )
}

let fetchblog = async (req, res) => {
    let data = await blogModel.find()
    res.send(
        {
            status: true,
            message: 'blog data fetched...',
            data
        }
    )
}

let fetchlocation = async (req, res) => {

    let data = await locationModel.find()
    res.send(
        {
            status: true,
            message: 'location data fetched...',
            data
        }
    )
}

let fetchfaq = async (req, res) => {

    let data = await faqModel.find()
    res.send(
        {
            status: true,
            message: 'FAQ data fetched...',
            data
        }
    )
}

let fetchtestimonial = async (req, res) => {

    let data = await testimonialModel.find()
    res.send(
        {
            status: true,
            message: 'testimonial data fetched...',
            data
        }
    )
}

module.exports = { fetchprogram,fetchnutrition,fetchblog,fetchlocation,fetchfaq,fetchtestimonial }