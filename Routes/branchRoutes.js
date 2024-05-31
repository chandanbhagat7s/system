
const express = require('express');
const { createInfoCollectorAccount, createInfoConfirmerAccount, createAccountent, createTeacher, createHeadOfTeacher } = require('../Controllers/branchController');

const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const branchRouter = express.Router()


branchRouter.use(Login, giveAccess("BRANCH_ADMIN"))
branchRouter.post("/create/infoCollectorAccount", createInfoCollectorAccount)
branchRouter.post("/create/infoConfirmerAccount", createInfoConfirmerAccount)
branchRouter.post("/create/accountentAccount", createAccountent)
branchRouter.post("/create/teachersAccount", createTeacher)
branchRouter.post("/create/headOfTeacher", createHeadOfTeacher)






module.exports = branchRouter




