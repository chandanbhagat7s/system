const express = require('express');
const { haveNewAdmission, confirmAdmission, getAllCollectedApplication, getAllSubmittedApplicant, deleteApplicantApplication, getAllConfirmedApplication, } = require('../Controllers/crpController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const crpRouter = express.Router()


crpRouter.use(Login)
crpRouter.post("/haveNewAdmission", giveAccess("CPR_COLLECTOR"), haveNewAdmission)
crpRouter.get("/getAllSubmittedApplicantByCollector", giveAccess("CPR_COLLECTOR"), getAllSubmittedApplicant)

crpRouter.get("/getAllCollectedApplication", giveAccess("CPR_CONFIRMER"), getAllCollectedApplication)
crpRouter.patch("/confirmAdmission", giveAccess("CPR_CONFIRMER"), confirmAdmission)
crpRouter.delete("/deleteApplicantAdmission", giveAccess("CPR_CONFIRMER"), deleteApplicantApplication)


crpRouter.get("/getAllConfirmedAdmission", giveAccess("CPR_ACCOUNTENT"), getAllConfirmedApplication)
// crpRouter.get("/getAllConfirmedAdmission", giveAccess("CPR_ACCOUNTENT"), getAllConfirmedApplication)


module.exports = crpRouter;



















