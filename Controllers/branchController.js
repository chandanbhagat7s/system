const Branch = require("../Models/Branch");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createAccountsCRMroles = catchAsync(async (req, res, next) => {

    const { name, password, email, role } = req.body;

    if (!name || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }
    if (role !== "CPR_COLLECTOR" && role !== "CPR_CONFIRMER" && role !== "CPR_ACCOUNTENT") {
        return next(new appError("please provide valid role", 400))

    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }

    const branch = await Branch.findOne({
        branchAdminData: req.user._id
    })

    const newUser = await User.create({
        name: name, email, password, role,
        branchData: branch._id

    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }



    let branchData;
    if (role == "CPR_COLLECTOR") {
        branchData = await Branch.findOneAndUpdate({
            branchAdminData: req.user._id,
        }, {
            infoCollectores: newUser._id
        })
    } else if (role == "CPR_CONFIRMER") {
        branchData = await Branch.findOneAndUpdate({
            branchAdminData: req.user._id,
        }, {
            infoConfirmer: newUser._id
        })
    } else {
        branchData = await Branch.findOneAndUpdate({
            branchAdminData: req.user._id,
        }, {
            accountent: newUser._id
        })
    }

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }
    res.status(200).send({
        status: "success",
        msg: "Account created of information collector !"
    })





})




exports.createTeacher = catchAsync(async (req, res, next) => {

    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }
    const branch = await Branch.findOne({
        branchAdminData: req.user._id
    })

    const newUser = await User.create({
        name: name, email, password, role: "TEACHER",
        branchData: branch._id
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        $push: { teachers: newUser._id }
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }


    res.status(200).send({
        status: "success",
        msg: "Account created of teacher !"
    })





})
exports.createHeadOfTeacher = catchAsync(async (req, res, next) => {

    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const branch = await Branch.findOne({
        branchAdminData: req.user._id
    })
    console.log(branch);

    if (branch.headOfTeacher) {
        return next(new appError("Head of teacher already exists you can create only one head of teachers", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }


    const newUser = await User.create({
        name: name, email, password, role: "TEACHERS_HEAD",
        branchData: branch._id
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        headOfTeacher: newUser._id
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }


    res.status(200).send({
        status: "success",
        msg: "Account created of head of teacher !"
    })





})





exports.createPrincipleAccount = catchAsync(async (req, res, next) => {

    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return next(new appError("Please Enter all the details to create a new information's collector account", 400))
    }

    const branch = await Branch.findOne({
        branchAdminData: req.user._id
    })
    console.log(branch);

    if (branch.principal) {
        return next(new appError(" Principle Account already exists ", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }


    const newUser = await User.create({
        name: name, email, password, role: "PRINCIPAL",
        branchData: branch._id
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }




    const branchData = await Branch.findOneAndUpdate({
        branchAdminData: req.user._id,
    }, {
        principal: newUser._id
    })

    if (!branchData) {
        return next(new appError("Somoething went wrong please try again", 400))
    }


    res.status(200).send({
        status: "success",
        msg: "Account created of Principal !"
    })





})
















