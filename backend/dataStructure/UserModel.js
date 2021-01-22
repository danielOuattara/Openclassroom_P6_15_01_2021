
const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator       = require('email-validator');


const  userModel = mongoose.Schema(
 {
   //  userID:   {type: String, required: true, unique: true},
    email:    { type: String, required: true, unique: true, validate: [ validator.validate, 'Invalid email' ] },
    password: { type: String, required: true } 
 });

 userModel.plugin(uniqueValidator)

 
module.exports = mongoose.model('User', userModel);