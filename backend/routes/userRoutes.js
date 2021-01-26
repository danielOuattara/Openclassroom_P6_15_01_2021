const express  = require('express');
const router   = express.Router();

const  usersController   = require('../controllers/userControllers.js')
const endpointProtection = require('./../auth/endpointProtection.js')

router.post('/signup', endpointProtection.endpointProtection, usersController.singup);
router.post('/login',  endpointProtection.endpointProtection, usersController.login);

module.exports = router; 