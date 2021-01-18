
const mongoose = require('mongoose');
const  schemaUtilisateur = mongoose.Schema({

    userID: {type: String, required: true},
    email:  {type: String, required: true},
    password:   {type: String, required: true}
})

module.exports = mongoose.model('schemaUtilisateur', schemaUtilisateur);