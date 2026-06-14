let express=require('express')
const { userdashboard } = require('./userdashboard')
const { webapiRoutes } = require('./webApiRoute')

let  webRoutes=express.Router()


webRoutes.use('/web-api',webapiRoutes)

webRoutes.use('/authentication',userdashboard)

module.exports={ webRoutes}