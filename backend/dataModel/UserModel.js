
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const  userModel = mongoose.Schema(
 {
    userID:   {type: String, required: true, unique: true},
    email:    {type: String, required: true},
    password: {type: String, required: true} 
 });

 userModel.plugin(uniqueValidator)

 
module.exports = mongoose.model('User', userModel);