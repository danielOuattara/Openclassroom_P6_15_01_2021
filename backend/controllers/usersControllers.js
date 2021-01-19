const User = require('../dataModel/UserModel.js');


exports.singup = (req, res, next) => {   // recupère les inscriptions  :: TODO: INCOMPLET  <<------ !##################################

    if (req.body._id) delete req.body._id;
    const utilisateur = new User({ ... req.body});
    utilisateur.save()
        .then( () => res.status(201).json({ message: 'Inscription Réussie. Bienvenue Chez Se Pokocko !'}))
        .catch( error => res.status(400).json({error}));
}

exports.login = (req, res, next) => {   // récupère les connexions :: TODO: INCOMPLET  <<------ !##################################
    const utilisateur = new User({ ... req.body});
    utilisateur.save()
        .then(() => res.status(201).json({ message: 'Connexion Réussie, Content De Vous Revoir'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })

}