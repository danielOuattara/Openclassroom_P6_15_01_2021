const express          = require('express');
const router           = express.Router();
const auth             = require('./../auth/auth.js')
const saucesController = require('./../controllers/saucesControllers.js')
const multer           = require('multer')


router.post('/',         auth, multer, saucesController.addSauce );
router.post('/:id/like', auth,         saucesController.userLikeSauce);
router.delete('/:id',    auth,         saucesController.deleteOneSauce);
router.put('/:id',       auth,         saucesController.updateSauce);
router.get('/:id',       auth,         saucesController.getOneSauce);
router.get('/',          auth,         saucesController.getAllSauce );


module.exports = router;