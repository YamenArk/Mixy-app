const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();


//////////////////////////////////////////////////////////user
router.post('/add-user',adminController.add_user);
router.get('/get-users',adminController.get_users);
router.get('/get-user/:userID',adminController.get_user);
router.put('/user/:userID',adminController.update_user);
router.delete('/user/:userID',adminController.delete_user);
////////////////////////////////////////////
router.put('/sharing/:elementID',adminController.sharing);


module.exports = router;