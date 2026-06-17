let express = require('express')
const { register, login, securityToken, changepassword, editAdminprofile, getAdminprofile } = require('../../controllers/authentication/admin/authController')
const { addProgram, getProgram, deleteProgram, updateProgram } = require('../../controllers/dashboard/programController')
const uploadFile = require('../../config/fileuploadConfig')
const { addNutrition, getNutrition, deletenutrition, editNutrition } = require('../../controllers/dashboard/nutritionController')
const { addBlog, getblog, deleteblog, updateblog } = require('../../controllers/dashboard/blogController')
const { addlocation, getlocation, editlocation, deletelocation } = require('../../controllers/dashboard/locationController')
const { addFaq, getFaq, editFaq, deleteFaq } = require('../../controllers/dashboard/faqControlle')
const { addtestimonial, gettestimonial, edittestimonial, deletetestimonial } = require('../../controllers/dashboard/testimonialController')
const { addQuery, getQuery, deleteQuery, downloadQueryPDF } = require('../../controllers/dashboard/queryController')
const { verifyToken } = require('../../middleware/verifyToken')
const { getAllmember, datadelete } = require('../../controllers/dashboard/subscription')
const { getuserRegistred, deleteRegistredUsers } = require('../../controllers/dashboard/registred-users')



let dashboardRoutes = express.Router()

//Admin Authentication Parts
dashboardRoutes.post('/admin-signUp', register)
dashboardRoutes.post('/admin-signIn', login)
dashboardRoutes.put('/change-adminPassword', changepassword)
dashboardRoutes.put('/edit-adminProfile', uploadFile('admin-profile').single('profileImg'), editAdminprofile)
dashboardRoutes.get('/verify-token', verifyToken, securityToken)
dashboardRoutes.get('/get-adminProfile', getAdminprofile)

// Program Part

dashboardRoutes.post('/add-program', uploadFile('program-folder').single('programImg'), addProgram)
dashboardRoutes.get('/get-program', getProgram)

dashboardRoutes.put('/update-program/:id', uploadFile('program-folder').single('programImg'), updateProgram)

dashboardRoutes.delete('/delete-program/:id', deleteProgram)

// Nutritions Parts
dashboardRoutes.post('/add-nutrition', uploadFile('Nutrition-folder').single('nutritionImg'), addNutrition)
dashboardRoutes.get('/get-nutrition', getNutrition)

dashboardRoutes.put('/edit-nutrition/:id', uploadFile('Nutrition-folder').single('nutritionImg'), editNutrition)

dashboardRoutes.delete('/delete-nutrition/:id', deletenutrition)

// Blogs Parts
dashboardRoutes.post('/add-blog', uploadFile('blog-folder').single('blogImg'), addBlog)
dashboardRoutes.get('/get-blog', getblog)

dashboardRoutes.put('/edit-blog/:id', uploadFile('blog-folder').single('blogImg'), updateblog)

dashboardRoutes.delete('/delete-blog/:id', deleteblog)


// Location Part Here 

dashboardRoutes.post('/add-location', addlocation)
dashboardRoutes.get('/get-location', getlocation)
dashboardRoutes.put('/edit-location/:id', editlocation)
dashboardRoutes.delete('/delete-location/:id', deletelocation)


// Faq Parts

dashboardRoutes.post('/add-faq', addFaq)
dashboardRoutes.get('/get-faq', getFaq)
dashboardRoutes.put('/edit-faq/:id', editFaq)
dashboardRoutes.delete('/delete-faq/:id', deleteFaq)

// testimonial Parts

dashboardRoutes.post('/add-testimonial', uploadFile('testimonial-folder').single('testimonialImg'), addtestimonial)
dashboardRoutes.get('/get-testimonial', gettestimonial)

dashboardRoutes.put('/edit-testimonial/:id', uploadFile('testimonial-folder').single('testimonialImg'), edittestimonial)

dashboardRoutes.delete('/delete-testimonial/:id', deletetestimonial)


// User Query  Parts
dashboardRoutes.post('/add-query', addQuery)
dashboardRoutes.get('/get-query', getQuery)
dashboardRoutes.delete('/delete-query/:id', deleteQuery)

// Subscription data fetched
dashboardRoutes.get('/get-Allmember', getAllmember)
dashboardRoutes.delete('/delete-member/:id', datadelete)

// Registred Users data fetched
dashboardRoutes.get('/get-registered', getuserRegistred)
dashboardRoutes.delete('/delete-registered/:id',deleteRegistredUsers)


module.exports = { dashboardRoutes }