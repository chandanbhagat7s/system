const mongoose = require('mongoose');


const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "course must have a name"],

    },
    duration: {
        type: String,
        required: [true, "course must have a duration in months or in year"],

    },
    price: {
        type: Number,
        required: [true, "course must have a price"],
    },
    ofBranch: {
        type: mongoose.mongo.ObjectId,
        required: [true, "course might belong some branch "],
        ref: "course"
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }

})
const Course = mongoose.model("course", courseSchema);
module.exports = Course;




















