const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({

    createdAt: {
        default: Date.now(),

        type: Date
    },
    ofBranch: {
        required: [true, "must belong to some branch"],
        type: mongoose.mongo.ObjectId,
        ref: "branch"
    },
    byTeacher: {
        required: [true, "must belong to teacher"],
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    taskData: {
        type: Object,
        required: [true, "task must have some data"]
    },
    teacherRatingData: {
        required: [true, "rating must be provided"],

        type: Object,
    },
    headRatingData: {
        type: Object,
    },
    byHead: {

        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    adminRatingData: {
        type: Object,
    },
    teachersRatingScore: {
        type: Number,
        required: [true, "Rating count by teacher must be submited"]
    },
    HeadOfTachersRatingScore: {
        type: Number,

    },
    principleRatingScore: {
        type: Number,

    }





})


const Task = mongoose.model("task", taskSchema);

module.exports = Task;












