const Branch = require("../Models/Branch");
const Cpr = require("../Models/Crp");
const Info = require("../Models/StudentTempInfo");
const User = require("../Models/User");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { getAll } = require("../utils/factory");


exports.fillDataInfo = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new appError("something went wrong", 400))
    }

    const crp = await Cpr.findById(id)
    if (crp.confirmInfo) {
        return next(new appError("Your responce is already submitted", 400))
    }
    const {
        name,
        email,
        aadhar,
        mobile,
        parentsMobile
    } = req.body;



    const info = await Info.create({
        name,
        email,
        aadhar,
        mobile,
        parentsMobile
    })
    if (!info) {
        return next(new appError("please try to submit again , something went wrong", 400))
    }
    crp.confirmInfo = info._id;
    await crp.save()


    res.status(200).send({
        status: "success",
        msg: "information submitted"
    })
})



exports.haveNewAdmission = catchAsync(async (req, res, next) => {

    const { information, remark } = req.body;
    if (!information || !remark) {
        return next(new appError("please enter all the important details for the process", 400))
    }
    const admission = await Cpr.create({
        infoCollectorData: req.user._id,
        information,
        ofBranch: req.user.branchData,
        remark
    })

    res.status(200).send({
        status: "success",
        msg: "information submitted successfully"
    })




})

exports.confirmAdmission = catchAsync(async (req, res, next) => {
    const { studentId } = req.body;
    // if (!information) {
    //     return appError("please enter details to confirm the adminssion")
    // }
    console.log(req.body);

    const adm = await Cpr.findById(studentId)

    if (!adm?.confirmInfo) {
        return next(new appError("Let student submit the form first then only you can approve it ", 400))
    }
    adm.confirm = true;
    await adm.save();




    res.status(200).send({
        status: "success",
        msg: "marked for confirmation"
    })





})
exports.viewDetailsOfTempStudent = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // if (!information) {
    //     return appError("please enter details to confirm the adminssion")
    // }
    if (!id) {
        return next(new appError("Please pass student id to view info", 400))
    }

    const info = await Cpr.findById(id).populate("confirmInfo")



    res.status(200).send({
        status: "success",
        res: info.confirmInfo
    })




})

exports.getAllCollectedApplication = catchAsync(async (req, res, next) => {
    const list = await Cpr.find({
        confirm: false
    })


    res.status(200).send({
        status: "success",
        data: list
    })


})


exports.getAllSubmittedApplicant = catchAsync(async (req, res, next) => {
    const list = await Cpr.find({
        infoCollectorData: req.user._id

    }).select("-confirmInfo ")


    res.status(200).send({
        status: "success",
        data: list
    })


})



exports.deleteApplicantApplication = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new appError("please provide the applicant to be deleted", 400))
    }
    const list = await Cpr.findByIdAndDelete(id)


    res.status(200).send({
        status: "success",
        data: list
    })


})



exports.getAllConfirmedApplication = catchAsync(async (req, res, next) => {
    const list = await Cpr.find({
        confirm: true,
        ofBranch: req.user.branchData

    }).populate([{ path: 'confirmInfo', select: 'name address parentsMobile mobile' }, { path: "infoCollectorData", select: "name" }])
    // }).populate("confirmInfo infoCollectorData")


    res.status(200).send({
        status: "success",
        data: list
    })


})


exports.createStudentAccount = catchAsync(async (req, res, next) => {

    const { name, password, email, course } = req.body;
    const user = await User.create({
        name, password, email, branchData: req.user.branchData, course
    })
    if (!user) {
        return next(new appError("something went wrong please try again", 500))
    }
    const branchAdd = await Branch.findByIdAndUpdate(req.user.branchData, {
        $push: { students: user._id }
    })


    if (!branchAdd) {
        await User.findByIdAndDelete(user._id)
        return next(new appError("Something went wrong please try again", 500))
    }


    res.status(200).send({
        status: "success",
        msg: " Student account created successfully"
    })
})

exports.getAllStudentList = getAll(User)















