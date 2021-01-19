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



exports.login = (req, res, next) => {   
    User.findOne( {email: req.body.email})
        .then( user => {
            if(!user) {
                return res.status(401).json( {error: 'User Unknown'})
            }
            bcrypt.compare( req.body.password, user.password)

                .then( valid => {
                    if( !valid) {
                        return res.status(401).json( {error: ' Connexion Not Granted !'})
                    }
                    res.status(200).json( 
                        {
                            userID: user._id,
                            token: 'TOKEN'
                        }
                    )
                })
                .catch( error => res.status(500).json( {error}))
        })
        .catch( error => res.status(500).json( {error}))

}