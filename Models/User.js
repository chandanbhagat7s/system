
const { default: mongoose, Mongoose } = require("mongoose");

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide your name"]
    },
    password: {
        type: String,
        required: [true, "please provide your password"],

    },
    email: {
        type: String,
        required: [true, "please provide your emailID"]

    },
    role: {
        required: true,
        type: String,
        enum: ["ADMIN", "BRANCH_ADMIN", "CPR_COLLECTOR", "CPR_CONFIRMER", "CPR_ACCOUNTENT", "TEACHER", "USER", "STUDENT", "TEACHERS_HEAD"],
        default: "USER"

    },

    branchData: {
        type: mongoose.mongo.ObjectId,
        ref: "branch"
    }





})



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);

    next()

})



userSchema.methods.changedPasswords = async function (jwttokentime) {
    if (this.changedPasswodTime) {
        const change = parseInt(this.changedPasswodTime.getTime() / 1000, 10)
        // console.log(jwttokentime, this.changedPasswodTime.getTime() / 1000);
        // console.log(jwttokentime, change);
        // console.log(jwttokentime < change);
        return jwttokentime < change
    }


    // if user has not change the password at least once 
    return false;
}






userSchema.methods.correctPass = async function (inputpassword, password) {
    let t = await bcrypt.compare(inputpassword, password)
    console.log(t);
    return t
}



const User = mongoose.model("user", userSchema);

module.exports = User;












































