const Branch = require("../Models/Branch");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");



exports.createBranch = catchAsync(async (req, res, next) => {

    const { Branchname, BranchHolderName, password, email } = req.body;

    if (!Branchname || !password || !email || !BranchHolderName) {
        return next(new appError("Please Enter all the details to create a new branch", 400))
    }

    const existingUser = await User.findOne({
        email: email
    })


    if (existingUser) {
        return next(new appError("email already exist please try diffrent email id", 400))
    }

    const newUser = await User.create({
        name: BranchHolderName, email, password, role: "BRANCH_ADMIN"
    })

    if (!newUser) {
        return next(new appError("Somoething went wrong please try again", 400))
    }
    const branch = await Branch.create({
        Branchname,
        createdBy: req.user._id,
        branchAdminData: newUser._id
    })

    if (!branch) {
        return next(new appError("Somoething went wrong please try again", 400))
    }

    await User.findByIdAndUpdate(newUser._id, {
        branchData: branch._id
    })

    res.status(200).send({
        status: "success",
        msg: "Branch Created Successfully !"
    })



})




















