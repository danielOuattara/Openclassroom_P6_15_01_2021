const Sauce   = require('../dataModel/Sauce.js.js.js');



exports.addSauce = (req, res, next) => {   // recupère les sauces
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
}



exports.userLikeSauce = (req, res, next) => {   // écouter les requêtes formulaires
    const sauce = new Sauce({ ... req.body});
    sauce.save()
        .then(() => res.status(201).json({ message: ' Message Enregisttré Réussie'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })
}



exports.deleteOneSauce = (req, res, next) => {   // supprime la sauce spécifique avec son ID au client
    Sauce.deleteOne( {_id: req.params.id})
        .then(() => res.status(201).json({ message: ' Suppression Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
}



exports.updateSauce =  (req, res, next) => {   // actualise la sauce spécifique avec son ID 
    Sauce.updateOne( {_id: req.params.id}, {...req.boby, _id:req.params.id})
        .then( () => res.status(201).json({ message: '  Actualisation Réussie pour : ' + req.params.id}))
        .catch( error => res.status(400).json({error}));
}


exports.getOneSauce = (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client; 
    Sauce.findOne( {_id: req.params.id} )
    .then( sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({error}));

}


exports.getAllSauce = (req, res, next) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
Sauce.find()
    .then( sauces => res.status(200).json(sauces))
    .catch( error => res.status(400).json({error}));

}