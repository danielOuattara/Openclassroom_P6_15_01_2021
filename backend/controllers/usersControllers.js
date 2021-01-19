const bcrypt = require('bcrypt');
const User = require('../dataModel/UserModel.js');


exports.singup = (req, res, next) => {   // recupère les inscriptions  :: TODO: INCOMPLET  <<------ !##################################

    bcrypt.hash( req.body.password, 10)
        .then( hash => {
            const user = new User( 
                {
                    email: req.body.email,
                    password: hash
                }
            );

            user.save()
                .then( () => res.status(201).json( {message: 'User Created !'}))
                .catch( error => res.status(400).json( {error}))
        })
        .catch(error => res.status(500).json( {error}))
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