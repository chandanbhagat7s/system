const express = require('express');
const { signup, login } = require('../Controllers/authController');
const authRoute = express.Router()


authRoute.post('/signup', signup)
authRoute.post('/login', login)



module.exports = authRoute






















