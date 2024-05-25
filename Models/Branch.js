
const { default: mongoose } = require("mongoose");

const bcrypt = require('bcryptjs');

const branchSchema = new mongoose.Schema({

    Branchname: {
        type: String,
        required: [true, "please provide your branch name to create new Branch"]
    },
    createdBy: {
        required: [true, "must have a creater"],
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    branchAdminData: {
        required: [true, "must have a Branch Admin"],
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    infoCollectores: {
        type: [mongoose.mongo.ObjectId],
        ref: "user"
    },
    infoConfirmer: {
        type: mongoose.mongo.ObjectId,
        ref: "user"
    },
    accountent: {
        type: mongoose.mongo.ObjectId,
        ref: "user"
    }








})



branchSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);

    next()

})



branchSchema.methods.changedPasswords = async function (jwttokentime) {
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






branchSchema.methods.correctPass = async function (inputpassword, password) {
    let t = await bcrypt.compare(inputpassword, password)
    console.log(t);
    return t
}



const Branch = mongoose.model("branch", branchSchema);

module.exports = Branch;












































