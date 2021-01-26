const bcrypt       = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User         = require('../dataStructure/UserModel.js');
const validator    = require('email-validator');


exports.singup = (req, res, next) => {  

    if (!validator.validate(req.body.email)) {
        return res.status(401).json({error: 'This email address is not valid'} )              // 'Email Not Valid'
    }

    User.findOne( {email: req.body.email} )
    .then( userCheck => {

        if(userCheck) {
            return res.status(401).json( {error: 'This email address is already used !'}) 
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€]{7,}/.test(req.body.password)) {   // Test password strength
            return res.status(401).json({ error: 'Password is a minimum of 7 characters, at least: of 1 lower case letter, 1 uppercase letter, 1 digit, 1 specila between _ ! ? & # @ $ % µ € ' });
          } 
       
        bcrypt.hash( req.body.password, 13)
        .then( hash => {
            const user = new User( 
                {
                    email: req.body.email,
                    password: hash
                }
            );
            user.save()
            .then( () => res.status(201).json( {message: 'User Created !'}))
            .catch( error =>  { console.log(error) ; res.status(400).json( {error}) })
        })
        .catch(error => res.status(500).json( {error}))
    })
    .catch( error =>  res.status(500).json( {error}))
}



exports.login = (req, res, next) => {  
   
    if (!validator.validate(req.body.email)) {
        return res.status(401).json({error} )              // 'Email Not Valid'
    }
    
    User.findOne( {email: req.body.email})
    .then( user => {
        if(!user) {
            return res.status(401).json( {error} )         // 'Email Unknown '
        }
        bcrypt.compare( req.body.password, user.password)
        .then( valid => {
            if(valid) {
                res.status(200).json( 
                    { 
                       userId: user._id,
                       token: jsonwebtoken.sign( { userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' } )
                    }
                )
            } else {          
                return res.status(401).json( {error} )    // Password Not Recognized
            }
        })
        .catch( error => res.status(500).json( {error} ))
    })
    .catch( error => res.status(500).json( {error} ))
}