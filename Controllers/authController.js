



const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../Models/User');
const appError = require('../utils/appError');



const createTokenSendRes = (id, res, statusCode, data) => {

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRIR_IN
    });
    let cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),


        secure: true,
        httpOnly: true,
        sameSite: "None",
        path: "/",
    };
    if (process.env.NODE_ENV == 'production') {

        cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions);
    // res.headers['access-control-allow-credentials'] = true

    // we will set cookies 
    res.status(statusCode).json({
        status: "success",
        data,
        token

    })
}


exports.signup = catchAsync(async (req, res, next) => {

    console.log("HIT");
    const {
        name,
        password,
        email,
    } = req.body;


    if (!name || !password || !email) {
        return next(new appError("please enter credential for get into in ", 400));
    }


    const newUser = await User.create({ name, email, password });



    createTokenSendRes(newUser._id, res, 201, newUser)


})
exports.login = catchAsync(async (req, res, next) => {


    const {
        password,
        email,
    } = req.body;


    const user = await User.findOne({ email })


    if (!user || !await user.correctPass(password, user.password)) {

        return next(new appError("please enter valid email id and password", 400));
    }


    createTokenSendRes(user._id, res, 201, user)


})






