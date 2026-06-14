let express = require('express')
const { userLogin, userRegistration, checkExitoken, getprofile, changepassword, editprofile } = require('../../controllers/authentication/users/user-authController')
const { verifyToken } = require('../../middleware/verifyToken')
const { createOrder, verifyPayment, getSubscription } = require('../../controllers/website/userdashboard/subscriptionController')
const { showHistroy } = require('../../controllers/website/userdashboard/histroyController')
const uploadFile = require('../../config/fileuploadConfig')
const { dashboardRoutes } = require('../dashboardRoutes/dashboardRoutes')
 


let userdashboard = express()

// User Authentication
userdashboard.post('/user-register', userRegistration)
userdashboard.post('/user-login', userLogin)
userdashboard.get('/verify-token', verifyToken, checkExitoken)

userdashboard.put('/edit-profile',uploadFile('user-profile').single('profileImg') ,editprofile)
userdashboard.get('/get-userprofile',getprofile)
userdashboard.post('/change-userpassword',changepassword)

// User Subscription
userdashboard.post('/create-order', createOrder)
userdashboard.post('/verify-payment', verifyPayment)
userdashboard.get('/get-subscription', getSubscription)

// User Histroy
userdashboard.get('/subscription-history', showHistroy)




module.exports = { userdashboard }