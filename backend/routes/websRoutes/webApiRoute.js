let express = require('express')
const { fetchprogram } = require('../../controllers/website/webapiController')

let webapiRoutes = express()

webapiRoutes.get('/fetch-program',fetchprogram)

module.exports = { webapiRoutes }