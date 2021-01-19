const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const app         = express(); //  cree une application express
const mongoose    = require('mogoose');
const Utilisateur = require('./schemaDeDonnees/Utilisateur.js')
const Sauce       = require('./schemaDeDonnees/Sauce.js')


mongoose.connect('mongodb+srv://danielOuattaraSepekocko:Zl8UkVDuAUXJ9MvEZl8UkVDuAUXJ9MvE@cluster0.vndw3.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());


app.post('/api/auth/signup', (req, res, next) => {   // recupère les inscriptions  :: TODO: INCOMPLET  <<------ !##################################

    if (req.body._id) delete req.body._id;
    const utilisateur = new Utilisateur({ ... req.body});
    utilisateur.save()
        .then( () => res.status(201).json({ message: 'Inscription Réussie. Bienvenue Chez Se Pokocko !'}))
        .catch( error => res.status(400).json({error}));
});



app.post('/api/auth/login', (req, res, next) => {   // récupère les connexions :: TODO: INCOMPLET  <<------ !##################################
    const utilisateur = new Utilisateur({ ... req.body});
    utilisateur.save()
        .then(() => res.status(201).json({ message: 'Connexion Réussie, Content De Vous Revoir'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })

});


app.post('/api/sauces', (req, res, next) => {   // recupère les sauces
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.post('/api/sauces/:id/like', (req, res, next) => {   // écouter les requêtes formulaires
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Message Enregisttré Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});



app.delete('/api/sauces/:id', (req, res, next) => {   // supprime la sauce spécifique avec son ID au client
    Sauce.deleteOne( {_id: req.params.id})
        .then(() => res.status(201).json({ message: ' Suppression Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
});



app.put('/api/sauces/:id', (req, res, next) => {   // actualise la sauce spécifique avec son ID 
    Sauce.updateOne( {_id: req.params.id}, {...req.boby, _id:req.params.id})
        .then( () => res.status(201).json({ message: '  Actualisation Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
});



app.get('/api/sauces/:id', (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client; 
    Sauce.findOne( {_id: req.params.id} )
    .then( sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({error}));

});


// OK !
app.get('/api/sauces', (req, res, next) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch( error => res.status(400).json({error}));

});

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

