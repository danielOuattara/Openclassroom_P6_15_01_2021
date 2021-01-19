const Utilisateur = require('../dataModel/Utilisateur.js');


exports.singUpUser = (req, res, next) => {   // recupère les inscriptions  :: TODO: INCOMPLET  <<------ !##################################

    if (req.body._id) delete req.body._id;
    const utilisateur = new Utilisateur({ ... req.body});
    utilisateur.save()
        .then( () => res.status(201).json({ message: 'Inscription Réussie. Bienvenue Chez Se Pokocko !'}))
        .catch( error => res.status(400).json({error}));
}

exports.loginUser = (req, res, next) => {   // récupère les connexions :: TODO: INCOMPLET  <<------ !##################################
    const utilisateur = new Utilisateur({ ... req.body});
    utilisateur.save()
        .then(() => res.status(201).json({ message: 'Connexion Réussie, Content De Vous Revoir'}))
        .catch( error => {
            console.log(error);
            res.status(400).json({error});
        })

}