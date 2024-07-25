const express = require('express');
const { haveNewAdmission, confirmAdmission, getAllCollectedApplication, getAllSubmittedApplicant, deleteApplicantApplication, getAllConfirmedApplication, fillDataInfo, viewDetailsOfTempStudent, createStudentAccount, getAllStudentList, } = require('../Controllers/crpController');
const { Login } = require('../Middleware/login');
const giveAccess = require('../Middleware/userAccess');

const crpRouter = express.Router()


// 

// crpRouter.get("/viewDetailsOfTempStudent/:id", viewDetailsOfTempStudent)
crpRouter.post("/fillMyInfo/:id", fillDataInfo)
crpRouter.use(Login)
crpRouter.post("/haveNewAdmission", giveAccess("CPR_COLLECTOR"), haveNewAdmission)
crpRouter.get("/getAllSubmittedApplicantByCollector", giveAccess("CPR_COLLECTOR"), getAllSubmittedApplicant)

crpRouter.get("/getAllCollectedApplication", giveAccess("CPR_CONFIRMER"), getAllCollectedApplication)
crpRouter.patch("/confirmAdmission", giveAccess("CPR_CONFIRMER"), confirmAdmission)
crpRouter.get("/viewDetailsOfTempStudent/:id", giveAccess("CPR_CONFIRMER"), viewDetailsOfTempStudent)

crpRouter.delete("/deleteApplicantAdmission/:id", giveAccess("CPR_CONFIRMER"), deleteApplicantApplication)



// crpRouter.get("/getAllConfirmedAdmission", giveAccess("CPR_ACCOUNTENT"), getAllConfirmedApplication)

crpRouter.use(giveAccess("CPR_ACCOUNTENT"))
crpRouter.get("/getAllConfirmedAdmission", getAllConfirmedApplication)
crpRouter.post("/createStudent", createStudentAccount)
crpRouter.get("/getAllStudentList", getAllStudentList)




/**
 * 10 th result
 * 
 */

module.exports = crpRouter;



















