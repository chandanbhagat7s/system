const express = require('express');
const { haveNewAdmission, confirmAdmission } = require('../Controllers/crpController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const crpRouter = express.Router()


crpRouter.use(Login, giveAccess("CPR_COLLECTOR"))
crpRouter.post("/haveNewAdmission", haveNewAdmission)
crpRouter.use(Login, giveAccess("CPR_CONFIRMER"))
crpRouter.post("/confirmAdmission", confirmAdmission)


module.exports = crpRouter;



















