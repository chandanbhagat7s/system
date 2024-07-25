const apiFeatures = require("./apiFeatures");
const appError = require("./appError")
const catchAsync = require("./catchAsync")

exports.getAll = Model => catchAsync(async (req, res, next) => {

    let features = new apiFeatures(Model.find(), req.query).filter().sorte().limiting().pagination()

    let doc = await features.query;

    if (!doc) {
        return next(new appError('failed to get all the Doc !!', 404))
    }

    res.status(200).json({
        status: 'success',
        totalResult: doc.length,
        data: doc
    })
})

exports.deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) {
        return next(new appError('no documnet found   ', 404))
    }
    res.status(204).json({
        status: "success",
        data: null

    })
})


exports.updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: false
    })

    if (!doc) {
        return next(new appError('cannot find document with this id ', 404))
    }


    res.status(200).json({
        status: "success",
        data: doc

    })

})


exports.createOne = Model => catchAsync(async (req, res, next) => {

    console.log("came in fun", req.body);
    const doc = await Model.create(req.body);
    console.log("DOC is", doc);
    if (!doc) {
        return next(new appError("Something went wrong please try again", 500))
    }

    res.status(200).json({
        status: "success",
        data: doc
    });



})


exports.getOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new appError("No document found with that id.", 404
    ))

    res.status(200).json({
        status: "success",
        data: doc
    });



})











