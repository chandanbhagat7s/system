const Task = require("../Models/Task");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.submitTeacherTaskWithRating = catchAsync(async (req, res, next) => {
    const { taskData, teacherRatingData } = req.body;
    if (!taskData || !teacherRatingData) {
        return next(new appError("please fill both the form  ", 400))
    }
    const newtask = await Task.create({
        ofBranch: req.user.branchData,
        byTeacher: req.user._id,
        teacherRatingData,
        taskData
    })
    if (!newtask) {
        return next(new appError("something went wrong ", 400))
    }

    res.status(200).send({
        status: "success",
        msg: "task submitted with rating"
    })




})



exports.submitTaskRatingByHead = catchAsync(async (req, res, next) => {
    const { taskId, headRatingData } = req.body;

    if (!headRatingData) {
        return next(new appError("please fill the  form  ", 400))
    }
    const newtask = await Task.findByIdAndUpdate(taskId, {
        ofBranch: req.user.branchData,
        byHead: req.user._id,
        headRatingData
    })
    if (!newtask) {
        return next(new appError("something went wrong ", 400))
    }

    res.status(200).send({
        status: "success",
        msg: " rating submitted"
    })




})


exports.getAllTasks = catchAsync(async (req, res, next) => {
    const allTasks = await Task.find({
        ofBranch: req.user.branchData,
    }).populate("byTeacher")

    res.status(200).send({
        status: "success",
        data: allTasks
    })
})









