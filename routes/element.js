const express = require('express');

var fs = require('fs');
var uuid = require('uuid');
const path = require('path');
const multer = require('multer');


//wallpaper
const WASubCategory = require('../models/wallpaper/WAsubcategory');
const WAimage = require('../models/wallpaper/WAimage');


//facebook 
const FSubCategory = require('../models/facebook/Fsubcategory');
const Fimage = require('../models/facebook/Fimage');



//WhatsaApp image
const ImageSubCategorie = require('../models/WhatsApp/image/ImageSubCategorie');
const WHimage = require('../models/WhatsApp/image/WHimage');








var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      let type;
      const subcategoryID = req.params.subcategoryID;
      if(req.body.type)
      {
        type = req.body.type;
      }
      else
      {
        type = req.params.type;
      }
      if(!type || type > 3 || type < 1)
      {
          const error = new Error(' Validation failed, entered data is incorrect.');
          error.statusCode = 422;
          return callBack(error);
      }
      if(type ==1) //facebook
      {
        if(req.params.elementID)
        {
          Fimage.findByPk(req.params.elementID)
            .then(element =>{
              if(!element)
                {
                    const error = new Error('the element is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  FSubCategory.findByPk(element.fsubcategoryId)
            })
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              const path = './public/images/facebook/'+subcategory.name;
              return path;
            })
            .then(path=>{
              callBack(null, path)   
            })
            .catch(err =>{
              if(!err.statusCode)
              {
              err.status = 500;
              }
              return callBack(err);
           });
          }
        else
        {
        FSubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
          if(!subcategory)
          {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;  
          }
          const path = './public/images/facebook/'+subcategory.name;
          callBack(null, path)     //  directory name where save the file
        })
        .catch(err =>{
          if(!err.statusCode)
          {
          err.status = 500;
          }
          return callBack(err);
      })
      }
      }
      else if(type ==2) // wallpaper
      {
        if(req.params.elementID)
        {
          WAimage.findByPk(req.params.elementID)
            .then(element =>{
              if(!element)
                {
                    const error = new Error('the element is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  WASubCategory.findByPk(element.wasubcategoryId)
            })
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             const  path = './public/images/wallpaper/'+subcategory.name;
            return path
            })
            .then(path =>{
              callBack(null, path)   
            })
            .catch(err =>{
              if(!err.statusCode)
              {
              err.status = 500;
              }
              return callBack(err);
           });
          }
        else
        {
        WASubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
          if(!subcategory)
          {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;  
          }
          const path = './public/images/wallpaper/'+subcategory.name;
          callBack(null, path)     //  directory name where save the file
        })
        .catch(err =>{
          if(!err.statusCode)
          {
          err.status = 500;
          }
          return callBack(err);
      })
    }
      }
      else if(type ==3) //WhatsApp image
      {
        if(req.params.elementID)
        {
          WHimage.findByPk(req.params.elementID)
            .then(element =>{
              if(!element)
                {
                    const error = new Error('the element is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  ImageSubCategorie.findByPk(element.imagesubcategorieId)
            })
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             const path = './public/images/WhatsAppImage/'+subcategory.name;
             return path
            })
            .then(path =>{
              callBack(null, path)   
            })
            .catch(err =>{
              if(!err.statusCode)
              {
              err.status = 500;
              }
              return callBack(err);
           });
          }
        else
        {
        ImageSubCategorie.findByPk(subcategoryID)
        .then(subcategory =>{
          if(!subcategory)
          {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;  
          }
          const path = './public/images/WhatsAppImage/'+subcategory.name;
          callBack(null, path)     //  directory name where save the file
        })
        .catch(err =>{
          if(!err.statusCode)
          {
          err.status = 500;
          }
          return callBack(err);
      })
    }
      }
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


const router = express.Router();
const textController = require('../controllers/elements/text');
const imageController = require('../controllers/elements/image');


///////////////////////////text
router.post('/addtext/:subcategoryID',textController.add);
router.get('/gettexts/:subcategoryID/:type',textController.gets);
router.get('/gettext/:elementID/:type',textController.get);
router.put('/updatetext/:elementID',textController.update);
router.delete('/deletetext/:elementID',textController.delete);


/////////////////////////////image
router.post('/addimage/:subcategoryID',upload.array('images', 12),imageController.add);
router.get('/getimages/:subcategoryID/:type',imageController.gets);
router.get('/getimage/:elementID/:type',imageController.get);
router.put('/updateimage/:elementID',upload.single('image'),imageController.update);
router.delete('/deleteimage/:elementID',imageController.delete);




module.exports = router;