let express = require('express')
const { fetchprogram, fetchnutrition, fetchblog, fetchlocation, fetchfaq, fetchtestimonial, filterData } = require('../../controllers/website/webapiController')

let webapiRoutes = express()

webapiRoutes.get('/fetch-program', fetchprogram)
webapiRoutes.get('/fetch-nutrition', fetchnutrition)
webapiRoutes.get('/fetch-filterData',filterData)
webapiRoutes.get('/fetch-blog', fetchblog)
webapiRoutes.get('/fetch-location', fetchlocation)
webapiRoutes.get('/fetch-faq', fetchfaq)
webapiRoutes.get('/fetch-testimonial', fetchtestimonial)

module.exports = { webapiRoutes }