
const express = require('express');
const { createInfoCollectorAccount, createInfoConfirmerAccount, createAccountent, createTeacher, createHeadOfTeacher, createPrincipleAccount, createAccountsCRMroles } = require('../Controllers/branchController');

const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const branchRouter = express.Router()


branchRouter.use(Login, giveAccess("BRANCH_ADMIN"))
branchRouter.post("/create/createAccountRoles", createAccountsCRMroles)



branchRouter.post("/create/teachersAccount", createTeacher)
branchRouter.post("/create/headOfTeacher", createHeadOfTeacher)
branchRouter.post("/create/principleAccount", createPrincipleAccount)






module.exports = branchRouter




