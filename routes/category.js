const express = require('express');

var fs = require('fs');
var uuid = require('uuid');

const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        let path;
        let type;
        if(req.body.type)
        {
          type = req.body.type;
        }
        else
        {
          type = req.params.type;
        }
        if(!type || type > 6 || type < 1)
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            return callBack(error);
        }
        if(type ==1) //Quotes Section
        {
          path = './public/images/category/Quotes';
          req.newpath = '/images/category/Quotes';
        }
        else if(type ==2) //facebook
        {
          path = './public/images/category/facebook';
          req.newpath = '/images/category/facebook';
        }
        else if(type ==3) // wallpaper
        {
          path = './public/images/category/wallpaper';
          req.newpath = '/images/category/wallpaper';
        }
        else if(type ==4 ) //WhatsApp image
        {
          path = './public/images/category/WhatsAppImage';
          req.newpath = '/images/category/WhatsAppImage';
        }
        else if(type ==5) // WhatsApp text   
        {
          path = './public/images/category/WhatsAppText';
          req.newpath = '/images/category/WhatsAppText';
        }
        else if(type ==6 ) //WhatsApp video 
        {
          path = './public/images/category/WhatsAppVideo';
          req.newpath = '/images/category/WhatsAppVideo';       
        }

        fs.mkdir(path ,{ recursive: true }, (err) => {
            if (err) throw err;
          });
        callBack(null, path)     //  directory name where save the file
          
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + uuid.v1() + path.extname(file.originalname))
    }
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  var upload = multer({
    storage: storage,
    fileFilter: fileFilter
  }); 

const categpryController = require('../controllers/category');
const router = express.Router();


router.post('/add-category',upload.single('image'),categpryController.add_category);
router.get('/get-categorys/:type',categpryController.get_categorys);
router.get('/:categoryID/:type',categpryController.get_category);
router.put('/:categoryID',upload.single('image'),categpryController.update_category);
router.delete('/:categoryID',categpryController.delete_category);



module.exports = router;