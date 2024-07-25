const Course = require("../Models/Course");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./../utils/factory")


exports.createCourseMiddleware = catchAsync(async (req, res, next) => {
    console.log("came into middleware", req.body);
    const { name, duration, price } = req.body;
    if (!name || !duration || !price) {
        return next(new appError("please pass all the fields", 400))
    }
    req.body = {}
    req.body = {
        name,
        duration,
        price,
        ofBranch: req.user.branchData
    }


    next()
})


exports.updateCourseMiddleware = catchAsync(async (req, res, next) => {
    const { name, duration, price } = req.body;
    if (!name || !duration || !price) {
        return next(new appError("please pass all the fields", 400))
    }
    req.body = {}
    req.body = {
        name,
        duration,
        price,
    }


    next()
})
exports.createCourse = factory.createOne(Course)
exports.deleteCourse = factory.deleteOne(Course)
exports.updateCourse = factory.updateOne(Course)


exports.getAllCourse = factory.getAll(Course)
















