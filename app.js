
const express = require('express');
const env = require('dotenv');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express()
const globalErrorHandler = require("./utils/globalError")


const mongoose = require('mongoose');
const adminRouter = require('./Routes/adminRoutes');
const authRoute = require('./Routes/authRoutes');
const branchRouter = require('./Routes/branchRoutes');
const crpRouter = require('./Routes/cprRoute');

env.config({ path: "./config.env" })


const MONGO_URL = process.env.MONGOURL
const PORT = process.env.PORT





app.use(express.json())

app.use(morgan('dev'))

app.use(cookieParser());


mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then((con) => {
        console.log("database connected");
    }).catch(e => {
        console.log("not connected");
    })





app.use("/api/v1/auth", authRoute)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/branch", branchRouter)
app.use("/api/v1/crp", crpRouter)

/**
 * admin -> create branches (name/id,password)
 * branches -> diffrent section (cpr,lms...)
 * cpr(acc.. created by admin) -> has account 
 */

app.all('*', (req, res, next) => {
    // next function called with argumnet will triger the error handler direcly okk 
    // next(new Error(`no route found with url ${req.originalUrl}`))
    // now simply we can implement it all the way around but we will create an error class and use it for the oprational error ok 
    next(new appError(`no such route with ${req.originalUrl} !!`, 404))
})

// to handle error : this is error first handler
app.use(globalErrorHandler)




app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT", PORT);
})









































