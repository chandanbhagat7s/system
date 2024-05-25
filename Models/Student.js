



const { default: mongoose } = require("mongoose");


const studentSchema = new mongoose.Schema({

    ofBranch: {
        type: mongoose.mongo.ObjectId,
        required: [true, "must belong to Branch to which student belongs "],
        ref: "branch"
    },
    feeInstallments: {
        type: Number,
        required: [true, "Student addmission must have installment"],
        enum: [1, 2, 3]
    },
    clearedFeesAndInstallments: {
        type: [Object],
        required: [true, "must provide how much due has been cleared /paid "]
    },
    department: {
        type: String,
        required: [true, "student must have a department to which he belongs"]
    },
    courseName: {
        type: [mongoose.mongo.ObjectId],
        required: [true, "Student must be assigned the course"]
    },
    duration: {
        type: String,
        required: [true, "duration of course must be filled"]

    },
    ofbranch: {
        type: [mongoose.mongo.ObjectId],
        required: [true, "Student must be belong to specific branch"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
    email: {
        type: String,
        required: [true, "student must have an email"]
    },
    admissionConfirmed: {
        type: Boolean,
        default: false
    },
    studentId: {
        type: mongoose.mongo.ObjectId,
        required: [true, "Student id must be provided"]
    },
















})






const Student = mongoose.model("cpr", studentSchema);

module.exports = Student;





























































