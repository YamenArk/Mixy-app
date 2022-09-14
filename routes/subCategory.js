const express = require('express');

var fs = require('fs');

const path = require('path');
const subcategoryController = require('../controllers/subCategory');
const router = express.Router();
var uuid = require('uuid');


//wallpaper
const WAcategory = require('../models/wallpaper/WAcategory');


//facebook 
const Fcategory = require('../models/facebook/Fcategory');
const FsubCategory = require('../models/facebook/Fsubcategory');


//Quotes
const Qcategory = require('../models/Quotes Section/Qcategory');
const Qsubcategory = require('../models/Quotes Section/qsubcategory');


//WhatsaApp image
const ImageCategorie = require('../models/WhatsApp/image/ImageCategorie');
const ImageSubCategorie = require('../models/WhatsApp/image/ImageSubCategorie');



//WhatsaApp text
const TextCategory = require('../models/WhatsApp/text/TextCategory');


//VideoCategories
const VideoCategorie = require('../models/WhatsApp/video/VideoCategorie');
const VideoSubCategorie = require('../models/WhatsApp/video/VideoSubCategorie');




const multer = require('multer');
const WAsubCategory = require('../models/wallpaper/WAsubcategory');
const TextSubCategory = require('../models/WhatsApp/text/TextSubCategory');
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
        const categoryID = req.params.categoryID;
        if(!type || type > 6 || type < 1)
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            return callBack(error);
        }
        if(type ==1) //Quotes Section
        {
          if(req.params.subcategoryID)
          {
            Qsubcategory.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  Qcategory.findByPk(subcategory.qcategoryId)
            })
            .then(category =>{
              if(!category)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/Quotes/'+category.name;
            })
            .then(() =>{
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
          else{
          Qcategory.findByPk(categoryID)
        .then(category =>{
          if(!category)
            {
              const error = new Error(' Validation failed, entered data is incorrect.');
              error.statusCode = 422;
              throw error;    
            }
          path = './public/images/subCategory/Quotes/'+category.name;
        })
        .then(() =>{
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
        }
        else if(type ==2)  //facebook
        {
          if(req.params.subcategoryID)
          {
            FsubCategory.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  Fcategory.findByPk(subcategory.fcategoryId)
            })
            .then(category =>{
              if(!category)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/facebook/'+category.name;
            })
            .then(() =>{
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
            Fcategory.findByPk(categoryID)
            .then(category =>{
              if(!category)
                {
                  const error = new Error(' Validation failed, entered data is incorrect.');
                  error.statusCode = 422;
                  throw error;     
                }
             path = './public/images/subCategory/facebook/'+category.name;
            })
            .then(() =>{
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

        }
        else if(type ==3) // wallpaper
        {
          if(req.params.subcategoryID)
          {
            WAsubCategory.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
                console.log(subcategory)
                console.log("=========")
                console.log(subcategory.wacategoryId)
              return  WAcategory.findByPk(subcategory.wacategoryId)
            })
            .then(category =>{
              if(!category)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/wallpaper/'+category.name;
            })
            .then(() =>{
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
          WAcategory.findByPk(categoryID)
          .then(category =>{
            if(!category)
              {
                const error = new Error(' Validation failed, entered data is incorrect.');
                error.statusCode = 422;
                throw error;   
              }
            path = './public/images/subCategory/wallpaper/'+category.name;
          })
          .then(() =>{
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
        }
        else if(type ==4) //WhatsApp image
        {
          if(req.params.subcategoryID)
          {
            ImageSubCategorie.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  ImageCategorie.findByPk(subcategory.imagecategorieId)
            })
            .then(category =>{
              if(!category)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/WhatsAppImage/'+category.name;
            })
            .then(() =>{
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
            ImageCategorie.findByPk(categoryID)
          .then(category =>{
            if(!category)
              {
                const error = new Error(' Validation failed, entered data is incorrect.');
                error.statusCode = 422;
                throw error;    
              }
            path = './public/images/subCategory/WhatsAppImage/'+category.name;
          })
          .then(() =>{
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
        }
        else if(type ==5) // WhatsApp text   
        {
          if(req.params.subcategoryID)
          {
            TextSubCategory.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  TextCategory.findByPk(subcategory.textcategoryId)
            })
            .then(category =>{
              if(!category)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/WhatsAppText/'+category.name;
            })
            .then(() =>{
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
          TextCategory.findByPk(categoryID)
          .then(category =>{
            if(!category)
              {
                const error = new Error(' Validation failed, entered data is incorrect.');
                error.statusCode = 422;
                throw error;      
              }
            path = './public/images/subCategory/WhatsAppText/'+category.name;
          })
          .then(() =>{
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
        }
        else if(type ==6) //WhatsApp video 
        {
          if(req.params.subcategoryID)
          {
            VideoSubCategorie.findByPk(req.params.subcategoryID)
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the subcategory is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  VideoCategorie.findByPk(subcategory.videocategorieId)
            })
            .then(category =>{
              if(!category)
                {
                  console.log("============")
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             path = './public/images/subCategory/WhatsAppVideo/'+category.name;
            })
            .then(() =>{
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
          VideoCategorie.findByPk(categoryID)
          .then(category =>{
            if(!category)
              {
                const error = new Error(' Validation failed, entered data is incorrect.');
                error.statusCode = 422;
                throw error;  
              }
            path = './public/images/subCategory/WhatsAppVideo/'+category.name;
          })
          .then(() =>{
            fs.mkdir(path ,{ recursive: true }, (err) => {
              if (err) throw err;
            });
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






router.post('/add-subcategory/:categoryID',upload.single('image'),subcategoryController.add_sub_category);
router.get('/get-subcategorys/:categoryID/:type',subcategoryController.get_sub_categorys);
router.get('/:subcategoryID/:type',subcategoryController.get_sub_category);
router.put('/:subcategoryID',upload.single('image'),subcategoryController.update_sub_category);
router.delete('/:subcategoryID',subcategoryController.delete_sub_category);


module.exports = router;