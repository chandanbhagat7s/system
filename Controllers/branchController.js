const Branch = require("../Models/Branch");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createInfoCollectorAccount = catchAsync(async (req, res, next) => {

    const { infoCollectorName, password, email } = req.body;

    if (!infoCollectorName || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }

    const newUser = await User.create({
        name: infoCollectorName, email, password, role: "CPR_COLLECTOR"
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        $push: {
            infoCollectores: newUser._id
        }
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }
    res.status(200).send({
        status: "success",
        message: "Account created of information collector !"
    })





})

exports.createInfoConfirmerAccount = catchAsync(async (req, res, next) => {

    const { infoConfirmer, password, email } = req.body;

    if (!infoConfirmer || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }

    const newUser = await User.create({
        name: infoConfirmer, email, password, role: "CPR_COLLECTOR"
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        infoConfirmer: newUser._id
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }
    res.status(200).send({
        status: "success",
        message: "Account created of information confirmer !"
    })





})


exports.createAccountent = catchAsync(async (req, res, next) => {

    const { accountentName, password, email } = req.body;

    if (!accountentName || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }

    const newUser = await User.create({
        name: accountentName, email, password, role: "CPR_ACCOUNTENT"
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        accountent: newUser._id
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }
    res.status(200).send({
        status: "success",
        message: "Account created of Accountent !"
    })





})

























