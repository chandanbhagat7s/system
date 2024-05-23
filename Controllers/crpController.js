const Cpr = require("../Models/Crp");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.haveNewAdmission = catchAsync(async (req, res, next) => {

    const { ofBranch, information, remark } = req.body;
    if (!ofBranch || !information || !remark) {
        return next(new appError("please enter all the important details for the process", 400))
    }
    const admission = await Cpr.create({
        infoCollectorData: req.user._id,
        information,
        ofBranch,
        remark
    })

    res.status(200).send({
        status: "success",
        message: "information submitted successfully"
    })




})

exports.confirmAdmission = catchAsync(async (req, res, next) => {
    const { confirm, reason, information, id } = req.body;
    if (!information) {
        return appError("please enter details to confirm the adminssion")
    }

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
            message: "marked for confirmation"
        })
    }




})



















