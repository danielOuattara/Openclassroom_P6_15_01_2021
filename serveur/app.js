const express  = require( 'express');  // importe 'express'
const boyParse = require( 'body-parser');

const app = express(); //  cree une application express

const mongoose = require('mogoose');

const SchemaUtilisateur = require('./schemaDeDonnees/SchemaUtilisateur.js')
const SchemaSauce = require('./schemaDeDonnees/SchemaSauce.js')

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


app.post('/api/auth/signup', (req, res, next) => {   // recupère les inscriptions

    if (req.body._id) delete req.body._id;
    const schemaUtilisateur = new SchemaUtilisateur({ ... req.body});
    schemaUtilisateur.save()
        .then( () => res.status(201).json({ message: 'Inscription Réussie. Bienvenue Chez Se Pokocko !'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.post('/api/auth/login', (req, res, next) => {   // récupère les connexions
    const schemaUtilisateur = new SchemaUtilisateur({ ... req.body});
    schemaUtilisateur.save()
        .then( () => res.status(201).json({ message: 'Connexion Réussie, Content De Vous Revoir'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })

});


app.post('/api/sauces', (req, res, next) => {   // recupère les sauces
    const schemaSauce = new SchemaSauce({ ... req.body});
    schemaSauce.save()
        .then( () => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.post('/api/sauces/:id/like', (req, res, next) => {   // écouter les requêtes formulaires
    const schemaSauce = new SchemaSauce({ ... req.body});
    schemaSauce.save()
        .then( () => res.status(201).json({ message: ' Message Enregisttré Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.put('/api/sauces/:id', (req, res, next) => {   // actualise la sauce spécifique avec son ID au client
    const schemaSauce = new SchemaSauce({ ... req.body});
    schemaSauce.save()
        .then( () => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.delete('/api/sauces/:id', (req, res, next) => {   // supprime la sauce spécifique avec son ID au client
    const schemaSauce = new SchemaSauce({ ... req.body});
    schemaSauce.save()
        .then( () => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


app.get('/api/sauces', (req, res, next) => {   // renvoie tableau de toutes les sauces au client de la BD
    SchemaSauce.find()
        .then( schemaSauce =>  {res.status(200).json(schemaSauce, console.log('Tableau De Sauce Envoyé'))})
        .catch( error => res.status(400).json({error}));

});


app.get('/api/sauces/:id', (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client; 
    SchemaSauce.find()
    .then( schemaSauce =>  {res.status(200).json(schemaSauce, console.log('Renvoi De Sauce Spécifique Réussie'))})
    .catch( error => res.status(400).json({error}));

});


module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

