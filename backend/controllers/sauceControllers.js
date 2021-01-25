
const Sauce = require('../dataStructure/SauceModel.js');
const fs    = require('fs');

const jsonwebtoken = require('jsonwebtoken')



//-----------------------------------------------------------------------------------------------------------
exports.addSauce = (req, res, next) => { 

  console.log(req.body)

    Sauce.findOne( // éviter répétitions d'articles  : ???  
        // {_id: req.params.id },
        {
          name:         req.body.sauce.name, 
          manufacturer: req.body.sauce.manufacturer,
          mainPepper:   req.body.sauce.mainPepper,
          heat:         req.body.sauce.heat
       }
    )

    .then( sauceCheck => {
        console.log(sauceCheck)
        if(sauceCheck) {
          return res.status(401).json( {error} | "Sauce Already Exists !");
        }

        const sauceObject = JSON.parse( req.body.sauce); 
        const sauce = new Sauce(
          {
            ...sauceObject,
            imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
        );
        sauce.save()
        .then( ()     => res.status(201).json({message: 'Item Registered !'}))
        .catch( error =>  { console.log(error) ; res.status(400).json( {error} ) });

    })
    .catch( error =>  res.status(500).json( {error}) )
} 

// -----------------------------------------------------------------------------------------------------------
// exports.userLikeSauce = (req, res, next) => {

//     if(req.body.like == 1) {  // ----> Annule mon vôte j'aime   OR  vote j'aime
//     console.log('LIKE  1 ')
//     console.log('req.bod.userId = ', req.body.userId);
//     console.log('jsonwebtoken... = ' ,jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RANDOM_TOKEN_SECRET').userId)
//     console.log('req.params.id = ',req.params.id)
//     console.log('---------------------------------------------------------')

//         Sauce.findOne( {_id: req.params.id })
//         .then( sauce => {
//           console.log('check = ', sauce.userLikeSauce.include(req.body.userId))

//             if(sauce.userLikeSauce.include(req.body.userId)) {
//                 Sauce.updateOne(
//                   {_id: req.params.id},
//                   {
//                     $inc:  {likes: -1},
//                     $pull: { usersLiked: req.body.userId},
//                     _id: req.params.id
//                   }
//                 )
//                 .then( () => res.status(201).json( { message: 'Vote remis à zéro !'}))
//                 .catch(error => res.status(400).json( {error } ))

//             }
            
//             if(!sauce.userLikeSauce.include(req.body.userId)) {
//                 Sauce.updateOne(
//                   {_id: req.params.id},
//                   {
//                     $inc:  { likes: +1 },
//                     $push: { usersLiked: req.body.userId},
//                     _id: req.params.id
//                   }
//                 )
//                 .then( () => res.status(201).json( { message: 'Merci d\'avoir vôté'}))
//                 .catch(error => res.status(400).json( {error } ))
//           }
//         })  
//         .catch(error => res.status(500).json( {error } ))
//     }


//     if(req.body.like == -1) {  // ----> Annule mon vôte j'aime pas  OR  vote j'aime pas
//     console.log('LIKE  -1 ')
//     console.log('req.bod.userId = ', req.body.userId);
//     console.log('jsonwebtoken... = ' ,jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RANDOM_TOKEN_SECRET').userId)
//     console.log('req.params.id = ',req.params.id)
//     console.log('---------------------------------------------------------')

//         Sauce.findOne( {_id: req.params.id })
//         .then( sauce => {
//           console.log('check = ', sauce.userLikeSauce.include(req.body.userId))
//             if(sauce.userLikeSauce.include(req.body.userId)) {
//                 Sauce.updateOne(
//                   {_id: req.params.id},
//                   {
//                     $inc:  {dislikes: -1},
//                     $pull: { usersDisliked: req.body.userId},
//                     _id: req.params.id
//                   }
//                 )
//                 .then( () => res.status(201).json( { message: 'Vote remis à zéro !'}))
//                 .catch(error => res.status(400).json( {error } ))

//             }

//             if(!sauce.userLikeSauce.include(req.body.userId)) {
//                 Sauce.updateOne(
//                   {_id: req.params.id},
//                   {
//                     $inc:  { dislikes: +1 },
//                     $push: { usersDisliked: req.body.userId},
//                     _id: req.params.id
//                   }
//                 )
//                 .then( () => res.status(201).json( { message: 'Merci d\'avoir vôté'}))
//                 .catch(error => res.status(400).json( {error } ))
//           }
//         })  
//         .catch(error => res.status(500).json( {error } ))
//     }

      
// }    
//-----------------------------------------------------------------------------------------------------------
exports.userLikeSauce = (req, res, next) => {

  // if ... if.. if  => swtich ...case ?

  switch(req.body.like)  {

     case 1:

          Sauce.updateOne(
            {_id: req.params.id},
            {
              $inc:  { likes: +1 },
              $push: { usersLiked: req.body.userId},
              _id: req.params.id
            }
          )
          .then( ()    => res.status(201).json( { message: 'Merci d\'avoir vôté'}))
          .catch(error => res.status(400).json( {error } ))
          break;

    case -1 :

      Sauce.updateOne(
        {_id: req.params.id},
        {
          $inc:  { dislikes: +1 },
          $push: { usersDisliked: req.body.userId},
          _id: req.params.id
        }
      )
      .then( ()    => res.status(201).json( { message: 'Merci d\'avoir vôté'}))
      .catch(error => res.status(400).json( {error } ))




   }
    

    if(req.body.like == 0) {  // ----> Annule mon vôte je n'aime pas  OR  vote je n'aime pas
        Sauce.findOne( 
            {
              _id: req.params.id,
              // usersDisliked: {$in: [req.body.userId] }
            }
        )
        .then( sauce => {

          if(sauce.userLikeSauce.include(req.body.userId)) {
                Sauce.updateOne(
                  {_id: req.params.id},
                  {
                    $inc:  {likes: -1},
                    $pull: { usersLiked: req.body.userId},
                    _id: req.params.id
                  }
                )
                .then( () => res.status(201).json( { message: 'Vote remis à zéro !'}))
                .catch(error => res.status(400).json( {error } ))

            }
            
            if(sauce.userDislikeSauce.include(req.body.userId)) {
                Sauce.updateOne(
                  {_id: req.params.id},
                  {
                    $inc:  { dislikes: -1 },
                    $pull: { usersLiked: req.body.userId},
                    _id: req.params.id
                  }
                )
                .then( () => res.status(201).json( { message: 'Merci d\'avoir vôté'}))
                .catch(error => res.status(400).json( {error } ))
            }  
        })  
        .catch(error => res.status(500).json( {error } )) 
      }
}
//-----------------------------------------------------------------------------------------------------------
exports.deleteOneSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink( `images/${filename}`, () => {
            Sauce.deleteOne( { _id: req.params.id } )
            .then( ()     => res.status(200).json( { message: 'Suppression Réussie !'}) )
            .catch( error => {console.log(error); res.status(400).json({error}) })
            })
    })
    .catch( error => { console.log(error) ; res.status(500).json({error}) })
}




//-----------------------------------------------------------------------------------------------------------
exports.updateSauce =  (req, res, next) => {  // actualise la sauce spécifique avec son ID  
    const sauceObject = req.file ? // il y a-t-il une fichier joint à la requête d'update ?
    {
      ...JSON.parse(req.body.sauce),  //si update d'image dans cet update
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    }
    :  // si non
    {
      ...req.body // si pas d'update image dans cette update
    }

    Sauce.updateOne( { _id: req.params.id }, { ...sauceObject, _id:req.params.id } )
    .then( ()     => res.status(200).json({ message: '  Actualisation Réussie pour : ' /*+ req.params.id*/}))
    .catch( error => { console.log( error) ; res.status(400).json({error}) })
}


// exports.updateSauce = (req, res, next) => {
//   if(req.file) {

//     findOne(
//       {_id:req.params.id},
      
//       )
//     const sauceObejct = {
//       ...JSON.parse(req.body.sauce),
//       imageUrl : `${req.protocol}://${req.get}`
//   }
//   }




//-----------------------------------------------------------------------------------------------------------
exports.getOneSauce = (req, res, next) => {  // renvoie la sauce spécifique avec son ID au client;   
    Sauce.findOne( { _id: req.params.id } )
    .then( sauce  => res.status(200).json(sauce))
    .catch( error =>  { console.log(error) ; res.status(404).json({error}) })
}




//-----------------------------------------------------------------------------------------------------------
exports.getAllSauce = (req, res, next) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
    Sauce.find()
    .then( sauces => res.status(200).json(sauces))
    .catch( error =>  { console.log(error) ; res.status(400).json({error}) });
}