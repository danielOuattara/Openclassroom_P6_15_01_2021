const express  = require('express');
const router   = express.Router();

const  usersController = require('../controllers/usersControllers.js')


router.post('/signup', usersController.singup);

router.post('/login', usersController.login);

module.exports = router; 