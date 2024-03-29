
const Sauce = require('../dataStructure/SauceModel');
const fs    = require('fs');

//-----------------------------------------------------------------------------------------------------------

exports.addSauce = async(req, res) => { // Async/Await
  try {
    const sauceObject = JSON.parse(req.body.sauce); 

    const pattern =  /[\[\]<>=0]+/gi;
    if (pattern.test(sauceObject.name) || // ` Restriction from  using those characters:  ^ < > ' " = 1 0 `
        pattern.test(sauceObject.manufacturer) || 
        pattern.test(sauceObject.description)  || 
        pattern.test(sauceObject.mainPepper ) 
    ){ 
      fs.unlink( `images/${req.file.filename}`, function (err) {
          if (err) throw err;
      })
      return res.status(401).json( {error: "Fill in text Invalid !"} );   
    } 
  
    const duplicateSauce = await Sauce.findOne( // check for duplicate entry in database !
      {$and: [ 
              { name:         sauceObject.name},
              { manufacturer: sauceObject.manufacturer },
              { mainPepper:   sauceObject.mainPepper },
              { heat:         sauceObject.heat }
            ]
      }
    )

    if(duplicateSauce) {
      fs.unlink( `images/${req.file.filename}`, function (err) {
        if (err) throw err;
      })
      return res.status(401).json( {error: "Duplicate Sauce Found !"});  // Duplicate found in database
    }
    
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    await sauce.save()
    res.status(201).json({message: 'Item Registered !'})

  } catch (error) {
    res.status(500).json( {error})
  }
} 

// //-----------------------------------------------------------------------------------------------------------
// exports.addSauce = (req, res) => {  // .then() .catch()

//     const sauceObject = JSON.parse(req.body.sauce); 

//     // do not trust user input !
//     const pattern =  /[\[\]<>=0]+/gi;

//     if( pattern.test(sauceObject.name)         ||
//         pattern.test(sauceObject.manufacturer) || 
//         pattern.test(sauceObject.description)  || 
//         pattern.test(sauceObject.mainPepper ) 
//     ){
//       fs.unlink( `images/${req.file.filename}`, function (err) {
//         if (err) throw err;
//       })
//       return res.status(401).json( {error: "Fill in text Invalid !"} );  // ` Restriction from  using those characters:  ^ < > ' " = 1 0 ` 
//     } 

//     // check for duplicate entry in database !
//     Sauce.findOne(   
//       {$and: [ 
//                 { name:         sauceObject.name},
//                 { manufacturer: sauceObject.manufacturer },
//                 { mainPepper:   sauceObject.mainPepper },
//                 { heat:         sauceObject.heat }
//               ]
//       }
//     )
//     .then( duplicate => {
//       if(duplicate) {
//           fs.unlink( `images/${req.file.filename}`, function (err) {
//             if (err) throw err;
//           })
//           return res.status(401).json( {error: "Duplicate Sauce Found !"});  // Duplicate found in database
//       }
//       const sauce = new Sauce({
//           ...sauceObject,
//           imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//       });
//       sauce.save()
//       .then(() => res.status(201).json({message: 'Item Registered !'}))
//       .catch( error => res.status(400).json( {error} ));
//     })
//     .catch( error => res.status(500).json( {error}))
// } 

//-----------------------------------------------------------------------------------------------------------
exports.userLikeSauce = async (req, res) => {  // Async/Await

  try {     
    const sauce = await Sauce.findOne({_id: req.params.id});
    if(!sauce) {
      return res.status(404).send(`Sauce Not Found`);
    }
    switch (req.body.like) {
      case 1:
        await sauce.updateOne({
          $inc:  { likes: +1 },
          $push: { usersLiked: req.body.userId},
          _id: req.params.id
        });
        res.status(201).json( { message: 'Thanks for vote'})
        break;

      case -1:
        await sauce.updateOne({
          $inc:  { dislikes: +1 },
          $push: { usersDisliked: req.body.userId},
          _id: req.params.id
        });
        res.status(201).json( { message: 'Thanks for vote'})
        break;

      case 0:
        if (sauce.usersLiked.find( userVote => userVote === req.body.userId)) {
          await sauce.updateOne({
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id
          });
          res.status(201).json( { message: 'Your vote was reversed' })
        } 
    
        if (sauce.usersDisliked.find( userVote => userVote === req.body.userId)) {
          await sauce.updateOne({
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
          });
          res.status(201).json({ message: 'Your vote was reversed' })
        }
        break;
     }
  } catch (error) {
    res.status(404).json({ error })
  }
}

// //-----------------------------------------------------------------------------------------------------------
// exports.userLikeSauce = (req, res) => { // .then() .catch()
//     switch (req.body.like) {
//         case 1:
//             Sauce.updateOne(
//                 {_id: req.params.id},
//                 {
//                   $inc:  { likes: +1 },
//                   $push: { usersLiked: req.body.userId},
//                   _id: req.params.id
//                 }
//             )
//             .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
//             .catch(error => res.status(400).json( {error } ))
//             break;
//         case -1:
//             Sauce.updateOne(
//                 {_id: req.params.id},
//                 {
//                   $inc:  { dislikes: +1 },
//                   $push: { usersDisliked: req.body.userId},
//                   _id: req.params.id
//                 }
//             )
//             .then( ()    => res.status(201).json( { message: 'Thanks for vote'}))
//             .catch(error => res.status(400).json( {error } ))
//             break;
//         case 0:
//             Sauce.findOne( { _id: req.params.id } )
//             .then((sauce) => {
//                 if (sauce.usersLiked.find( userVote => userVote === req.body.userId)) {
//                   Sauce.updateOne(
//                     { _id: req.params.id }, 
//                     {
//                       $inc: { likes: -1 },
//                       $pull: { usersLiked: req.body.userId },
//                       _id: req.params.id
//                     }
//                   )
//                     .then(() =>  res.status(201).json( { message: 'Your vote was reversed' } ) )
//                     .catch((error) =>  res.status(400).json( { error} ));  
//                 } 
            
//                 if (sauce.usersDisliked.find( userVote => userVote === req.body.userId)) {
//                   Sauce.updateOne(
//                     { _id: req.params.id }, {
//                       $inc: { dislikes: -1 },
//                       $pull: { usersDisliked: req.body.userId },
//                       _id: req.params.id
//                     }
//                   )
//                     .then( () => { res.status(201).json({ message: 'Your vote was reversed' }) })
//                     .catch( (error) =>  res.status(400).json({ error}));
//                 }
//             })
//             .catch(error => res.status(404).json({ error }));
//             break;
//     }
// }


//-----------------------------------------------------------------------------------------------------------
exports.deleteOneSauce = async (req, res) => {  // Async/Await
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id })
    if (!sauce) {
      return res.status(404).send('Item not not found!')
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).send('Request Non Authorized ')
    }
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink( `images/${filename}`, (err) => {
      if(err) {
        throw new Error(err.message)
      }
    });
    await sauce.deleteOne();
    res.status(200).json( { message: 'Item deleted succesfully !'});
  } catch (error) {
    res.status(500).json({error})
  }
}

//-----------------------------------------------------------------------------------------------------------
// exports.deleteOneSauce = (req, res) => {  // then()/catch()
//     Sauce.findOne({ _id: req.params.id })
//     .then( sauce => {
//       if (!sauce) {
//         return res.status(404).send('Item not not found!')
//       }
//       if (sauce.userId !== req.auth.userId) {
//         return res.status(401).send('Request Non Authorized ')
//       }
//       const filename = sauce.imageUrl.split('/images/')[1];
//       fs.unlink( `images/${filename}`, (err) => {
//         if(err) {
//           throw new Error(err.message)
//         }
//         Sauce.deleteOne( { _id: req.params.id } )
//         .then( () => res.status(200).json( { message: 'Item deleted succesfully !'}) )
//         .catch( error => {console.log(error); res.status(400).json({error}) })
//       })
//     })
//     .catch( error => res.status(500).json({error}))
// }

//----------------------------------------------------------------------------
// exports.updateSauce = async (req, res) => {  
//   try {
//     const sauce = await Sauce.findOne({_id: req.params.id })
//     if (!sauce) {
//       return res.status(404).send("Item not found !");
//     }
//     if (sauce.userId !== req.auth.userId) {
//       return res.status(401).send("Request Not Authorized !");
//     }

//     const sauceObject = req.file ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
//       } :  
//       {
//         ...req.body
//       } // sinon 
//     // do not trust user input, even on update !
//     const regex = /[\[\]<>=0]+/gi;
//     if (regex.test(sauceObject.name) ||
//         regex.test(sauceObject.manufacturer) || 
//         regex.test(sauceObject.description) || 
//         regex.test(sauceObject.mainPepper) 
//       ) {
//       return res.status(401).json({ error: ' Fill in text Invalid !'});
//     } 

//     if (req.file) {
//       const filename = sauce.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, (err) => {
//         if (err) {
//           return res.status(400).send(err.message)
//         }
//       })
//       await sauce.updateOne({...sauceObject});
//       return res.status(201).json('Update successfully !')
//     } else {
//       await sauce.updateOne({
//         ...sauceObject
//       })
//       return res.status(200).json('Update successfully !')
//     }

//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }


//----------------------------------------------------------------------------
exports.updateSauce =  (req, res) => {  // then()/catch()
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    if(!sauce) {
      return res.status(404).send('Item not not found!');
    }
    if(sauce.userId !== req.auth.userId) {
      return res.status(401).send('Request Non Authorized');
    }

    const sauceObject = req.file ? 
    {
      ...JSON.parse(req.body.sauce),  //si update d'image 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    }
    :  
    {...req.body} // sinon 
    // do not trust user input, even on update !
    const regex =  /[\[\]<>=0]+/gi;
    if ( regex.test(sauceObject.name)  ||
         regex.test(sauceObject.manufacturer) || 
         regex.test(sauceObject.description) || 
         regex.test(sauceObject.mainPepper ) 
       ) {
      return res.status(401).json( { error: ' Fill in text Invalid !' });
    } 

    if (req.file) {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink( `images/${filename}`, (err) => {
        if(err) {
          return res.status(400).send(err.message)
        }
        sauce.updateOne({...sauceObject})
        .then(() => res.status(201).json('Update successfully !'))
        .catch( error =>  res.status(400).json({error}))
      })
    } else {
      sauce.updateOne({ ...sauceObject})
      .then(() => res.status(200).json('Update successfully !'))
      .catch(error => res.status(400).json({error}))
    }
  })
  .catch(error => res.status(400).json(error.message))
}


//-----------------------------------------------------------------------------------------------------------

exports.getOneSauce = (req, res) => {  // renvoie la sauce spécifique avec son ID au client;   
    Sauce.findOne( { _id: req.params.id } )
    .then( sauce  => res.status(200).json(sauce))
    .catch( error => res.status(404).json( {error} ))
}

//-----------------------------------------------------------------------------------------------------------

exports.getAllSauce = (req, res) => {   // renvoie tableau de toutes les sauces de la BD à l'utilisateur
Sauce.find({})
.then( sauces => res.status(200).json(sauces))
.catch( error => res.status(400).json( {error} ));
}

//-----------------------------------------------------------------------------------------------------------