
const express = require('express');
const { getAllCourse } = require('../Controllers/lmsController');
const { Login } = require('../Middleware/login');
const lmsrouter = express.Router()

// lmsrouter.post("/create")
lmsrouter.use(Login)
lmsrouter.get("/getCourseList", getAllCourse)



module.exports = lmsrouter;







