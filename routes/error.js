const express = require('express');
const errorController = require('../controllers/error');
const router = express.Router();


//////////////////////////////////////////////////////////user
router.post('/add',errorController.add);
router.get('/gets',errorController.get);
router.delete('/delete/:errorID',errorController.delete);
module.exports = router;