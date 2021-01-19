const express = require('express');
const router  = express.Router();


const saucesController = require('./../controllers/saucesControllers.js')

router.post('/', saucesController.addSauce );

router.post('/:id/like', saucesController.userLikeSauce);

router.delete('/:id', saucesController.deleteOneSauce);

router.put('/:id', saucesController.updateSauce);

router.get('/:id', sauces.getOneSauce);

router.get('/', sauces.getAllSauce );

module.exports = router;