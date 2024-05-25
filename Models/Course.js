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
    department: {
        type: [String],
        enum: ["science", "physics", "computer science"]
    },

})




















