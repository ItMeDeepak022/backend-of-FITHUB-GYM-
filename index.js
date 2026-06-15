require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
const { dashboardRoutes } = require('./backend/routes/dashboardRoutes/dashboardRoutes')
const { webRoutes } = require('./backend/routes/websRoutes/webRoute')

let app = express()

const useragent = require('express-useragent')
app.use(useragent.express())

// To mange frontend and backend
let cors = require('cors')
app.use(cors())

// TO allow to get frontend data to backend
app.use(express.json())

// To allow acces the img view 
// app.use("/uploads", express.static("uploads/program-folder"))
// app.use("/uploads", express.static("uploads/Nutrition-folder"))
// app.use("/uploads", express.static("uploads/blog-folder"))
// app.use("/uploads", express.static("uploads/testimonial-folder"))
// app.use("/uploads", express.static("uploads/user-profile"))


app.use('/admin-dashboard', dashboardRoutes)

app.use('/website', webRoutes)


app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'backend of GYM Website is running now...😍😍'
    })
})


// `mongodb://127.0.0.1:27017/${process.env.DBName}`
mongoose.connect(process.env.DbUrl)
    .then(() => {
        app.listen(process.env.Port, () => {
            console.log("Server connect to mongodb Atlas ", process.env.Port);
        })
    })
    .catch((err) => {
        console.log(err);
    })




  