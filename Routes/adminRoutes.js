const express = require('express');
const { createBranch } = require('../Controllers/adminController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const adminRouter = express.Router()




adminRouter.use(Login, giveAccess("ADMIN"))
adminRouter.post("/createbranch", createBranch)



module.exports = adminRouter















