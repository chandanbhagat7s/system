
const { default: mongoose } = require("mongoose");


const crpSchema = new mongoose.Schema({

    infoCollectorData: {
        type: mongoose.mongo.ObjectId,
        required: [true, "please provide the information about information collactor"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    ofBranch: {
        type: mongoose.mongo.ObjectId,
        required: [true, "must belong to Branch "],
        ref: "branch"
    },
    information: {
        type: Object,
        required: [true, "must have an information to transfer further and process on it"]
    },
    remark: {
        type: String,
        required: [true, "must have status "]
    },
    confirm: {
        type: Boolean,
        default: false

    },
    confirmBy: {
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    confirmInfo: {
        type: Object
    },
    reasonForCancellation: {
        type: String
    },











})






const Cpr = mongoose.model("cpr", crpSchema);

module.exports = Cpr;












































