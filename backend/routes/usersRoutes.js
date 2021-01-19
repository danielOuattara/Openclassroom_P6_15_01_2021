const express  = require('express');
const router   = express.Router();

const  usersController = require('../controllers/usersControllers.js')


router.post('/signup', usersController.singUpUser);

router.post('/login', usersController.loginUser);

module.exports = router;