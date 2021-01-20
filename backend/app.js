const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const app         = express(); //  cree une application express
const mongoose    = require('mongoose');
const Utilisateur = require('./dataStructure/UserModel.js')
const Sauce       = require('./dataStructure/SauceModel.js')

const sauceRoutes = require('./routes/saucesRoutes.js')
const usersRoutes = require('./routes/usersRoutes.js')


mongoose.connect('mongodb+srv://danielOuattaraSepekocko:Zl8UkVDuAUXJ9MvEZl8UkVDuAUXJ9MvE@cluster0.vndw3.mongodb.net/se_pekocko?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());


app.use('/api/sauces', sauceRoutes )
app.use('/api/auth', usersRoutes )

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

