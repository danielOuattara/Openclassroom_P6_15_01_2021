const Sauce   = require('../dataStructure/SauceModel.js');
const fs = require('fs');


exports.addSauce = (req, res, next) => {   // recupère les sauces
    const sauceObject = JSON.parse( req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce(
      {
        ...sauceObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    );
    sauce.save()
    .then( () => res.status(201).json({message: 'Objet Bien Enregistré !'}))
    .catch( error =>  { console.log(error) ; res.status(400).json({error}) });
} 


exports.userLikeSauce = (req, res, next) => {   // écouter les requêtes formulaires
    const sauce = new Sauce({ ... req.body});   // route à terminer
    sauce.save()
    .then(() => res.status(201).json({ message: ' Message Enregistré Réussie'}))
    .catch( error => { console.log(error) ; res.status(400).json({error}) })
}


exports.deleteOneSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink( `images/${filename}`, () => {
            Sauce.deleteOne( { _id: req.params.id } )
            .then( () => res.status(200).json( { message: 'Suppression Réussie !'}))
            .catch( error => {console.log(error); res.status(400).json({error})})
            })
    })
    .catch( error => { console.log(error) ; res.status(500).json({error}) })
}


exports.updateSauce =  (req, res, next) => {   // actualise la sauce spécifique avec son ID 
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),  //si update d'image dans cet update
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    }
    :  // si non
    {
      ...req.body // si pas d'update image dans cette update
    }
    Sauce.updateOne( { _id: req.params.id }, { ...sauceObject, _id:req.params.id } )
    .then( () => res.status(200).json({ message: '  Actualisation Réussie pour : ' /*+ req.params.id*/}))
    .catch( error => { console.log( error) ; res.status(400).json({error}) })
}



exports.getOneSauce = (req, res, next) => {   // renvoie la sauce spécifique avec son ID au client; 
    Sauce.findOne( { _id: req.params.id } )
    .then( sauce => res.status(200).json(sauce))
    .catch( error =>  { cosole.log(error) ; res.status(404).json({error}) })
}



exports.getAllSauce = (req, res, next) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
    Sauce.find()
    .then( sauces => res.status(200).json(sauces))
    .catch( error =>  { console.log(error) ; res.status(400).json({error}) });
}