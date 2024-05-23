
const { default: mongoose } = require("mongoose");

const bcrypt = require('bcryptjs');

const crpSchema = new mongoose.Schema({

    infoCollectorName: {
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



const Branch = mongoose.model("branch", userSchema);

module.exports = Branch;












































