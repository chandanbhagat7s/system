const Cpr = require("../Models/Crp");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
    const { confirm, reason, id } = req.body;
    // if (!information) {
    //     return appError("please enter details to confirm the adminssion")
    // }

    const adm = await Cpr.findByIdAndUpdate(id, {
        confirmBy: req.user._id,
        confirmInfo: information,
        confirm,
        reasonForCancellation: reason || ""
    })

    if (reason) {
        res.status(200).send({
            status: "success",
            message: "marked for cancelation"
        })
    }
    else {


        res.status(200).send({
            status: "success",
            msg: "marked for confirmation"
        })
    }




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
    const { id } = req.body;
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
        confirm: true
    })


    res.status(200).send({
        status: "success",
        data: list
    })


})


















