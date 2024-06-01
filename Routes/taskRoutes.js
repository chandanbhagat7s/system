
const express = require('express');
const { submitTeacherTaskWithRating, getAllTasks, submitTaskRatingByHead, getAllTeahersData, getQueryData } = require('../Controllers/taskController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');
const taskRouter = express.Router()

taskRouter.use(Login)
taskRouter.get("/getAllTask", getAllTasks)
taskRouter.post("/submitTaskWithRating", submitTeacherTaskWithRating)
taskRouter.use(giveAccess("TEACHERS_HEAD", "PRINCIPAL"))
taskRouter.get("/:branchId/:teachersId", getQueryData)
taskRouter.get("/getAllTeachersData", getAllTeahersData)
taskRouter.post("/submitRatingOnTaskByHead", submitTaskRatingByHead)

module.exports = taskRouter





