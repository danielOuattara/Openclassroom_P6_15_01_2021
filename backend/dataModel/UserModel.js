
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const  schemaUtilisateur = mongoose.Schema(
 {
    userID:   {type: String, required: true, unique: true},
    email:    {type: String, required: true},
    password: {type: String, required: true} 
 });

 userModel.plugin(uniqueValidator)

 
module.exports = mongoose.model('Utilisateur', userModel);