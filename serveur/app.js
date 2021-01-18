const express  = require( 'express');  // importe 'express'
const boyParse = require( 'body-parser');

const app = express(); //  cree une application express

const mongoose = require('mogoose');

const SchemaUtilisateurs = require('./schemaDeDonnees/SchemaUtilisateur.js')
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
    console.log(req.body);
    res.status(201).json({
        message: 'inscription réussie'
    });
});

app.post('/api/auth/login', (req, res, next) => {   // récupère les connexions
    console.log(req.body);
    res.status(201).json({
        message: 'connexion reussie'
    });
});

app.post('/api/sauces', (req, res, next) => {   // recupère les sauces
    console.log(req.body);
    res.status(201).json({
        message: 'sauce captée'
    });
});

app.post('/api/sauces/:id/like', (req, res, next) => {   // écouter les requêtes formulaires
    console.log(req.body);
    res.status(201).json({
        message: 'sauce aimée (ou pas ?..ici ?)'
    });
});

app.get('/api/sauces', (req, res, next) => {   // renvoie tableau de toutes les sauces au client de la BD
    console.log(req.body);
    res.status(201).json({
        message: 'voici les sauces'
    });
});

app.get('/api/sauces/:id', (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client
    console.log(req.body);
    res.status(201).json({
        message: 'voici les sauces'
    });
});

app.put('/api/sauces/:id', (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client
    console.log(req.body);
    res.status(201).json({
        message: 'voici les sauces'
    });
});

app.delete('/api/sauces/:id', (req, res, next) => {   // supprime la sauce spécifique avec son ID au client
    console.log(req.body);
    res.status(201).json({
        message: 'voici les sauces'
    });
});



app.use('/api/stuff', (req, res, next) => {

    const stuff = [
        {
          _id: 'oeihfzeoi',
          title: 'Mon premier objet',
          description: 'Les infos de mon premier objet',
          imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
          price: 4900,
          userId: 'qsomihvqios',
        },
        {
          _id: 'oeihfzeomoihi',
          title: 'Mon deuxième objet',
          description: 'Les infos de mon deuxième objet',
          imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
          price: 2900,
          userId: 'qsomihvqios',
        },
      ];

    res.status(200).json(stuff);

});

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

