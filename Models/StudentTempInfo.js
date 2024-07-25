


const { default: mongoose } = require("mongoose");


const infoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide your name"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "please provide your emailID"],
        trim: true

    },
    photo: {
        type: String
    },
    aadhar: {
        type: String
    },

    mobile: {
        type: String
    },

    parentsMobile: {
        type: String
    },








})










const Info = mongoose.model("info", infoSchema);

module.exports = Info;












































