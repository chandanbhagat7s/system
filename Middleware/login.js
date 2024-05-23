const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const User = require("../Models/User");
const catchAsync = require("../utils/catchAsync");


exports.Login = catchAsync(async (req, res, next) => {
    // bringin out the token from the reqst header
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        // allowing the access to the protected route if we have jwt cookie
        token = req.cookies.jwt;
    }

    console.log("token is", token);
    if (!token) {
        return next(new appError('please login to get access', 401))
    }


    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)



    const freshUser = await User.findById(decode.id)
    if (!freshUser) {
        return next(new appError('the user do  not exist ', 401))
    }




    // now for if the user change the passwor then we shoud not access
    // console.log(await freshUser.changedPasswords(decode.iat));
    if (await freshUser.changedPasswords(decode.iat)) {
        return next(new appError('password is changed need to login again', 401))
    }

    // future use 
    req.user = freshUser;
    next()

})