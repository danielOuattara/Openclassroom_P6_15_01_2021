const express = require('express');
const router  = express.Router();
const Sauce   = require('./../schemaDeDonnees/Sauce.js');



router.post('/api/sauces', (req, res, next) => {   // recupère les sauces
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});


// '/api/sauces/:id/like'
router.post('/:id/like', (req, res, next) => {   // écouter les requêtes formulaires
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Message Enregisttré Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
});



router.delete('/:id', (req, res, next) => {   // supprime la sauce spécifique avec son ID au client
    Sauce.deleteOne( {_id: req.params.id})
        .then(() => res.status(201).json({ message: ' Suppression Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
});



router.put('/:id', (req, res, next) => {   // actualise la sauce spécifique avec son ID 
    Sauce.updateOne( {_id: req.params.id}, {...req.boby, _id:req.params.id})
        .then( () => res.status(201).json({ message: '  Actualisation Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
});



router.get('/:id', (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client; 
    Sauce.findOne( {_id: req.params.id} )
    .then( sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({error}));

});


// OK !
router.get('/', (req, res, next) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch( error => res.status(400).json({error}));

});

module.exports = router;