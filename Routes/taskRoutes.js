
const express = require('express');
const { submitTeacherTaskWithRating, getAllTasks, submitTaskRatingByHead } = require('../Controllers/taskController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');
const taskRouter = express.Router()

taskRouter.use(Login)
taskRouter.get("/getAllTask", getAllTasks)
taskRouter.post("/submitTaskWithRating", submitTeacherTaskWithRating)
taskRouter.use(giveAccess("TEACHERS_HEAD"))
taskRouter.post("/submitRatingOnTaskByHead", submitTaskRatingByHead)

module.exports = taskRouter





