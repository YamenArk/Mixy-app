const express = require('express');

var fs = require('fs');


//WhatsaApp video
const VideoSubCategorie = require('../models/WhatsApp/video/VideoSubCategorie');
const Video = require('../models/WhatsApp/video/video');



const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
    const subcategoryID = req.params.subcategoryID;
    if(req.params.elementID)
    {
        Video.findByPk(req.params.elementID)
            .then(element =>{
              if(!element)
                {
                    const error = new Error('the element is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
              return  VideoSubCategorie.findByPk(element.videosubcategorieId)
            })
            .then(subcategory =>{
              if(!subcategory)
                {
                    const error = new Error('the categoryID is not exist');
                    error.statusCode = 404;
                    throw error;    
                }
             const path = './public/images/WhatsAppVideo/'+subcategory.name;
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
      else{
      VideoSubCategorie.findByPk(subcategoryID)
      .then(subcategory =>{
        if(!subcategory)
        {
            const error = new Error('Could not find this subcategory.');
            error.statusCode = 404;
            throw error;
        }
        const path = './public/images/WhatsAppVideo/'+subcategory.name;
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
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' +Date.now()+ path.extname(file.originalname))
    }
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'video/gif' ||
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/ogg' ||
      file.mimetype === 'video/wmv' ||
      file.mimetype === 'video/x-flv' ||
      file.mimetype === 'video/avi' ||
      file.mimetype === 'video/webm' ||
      file.mimetype === 'video/wkv' ||
      file.mimetype === 'video/avchd' ||
      file.mimetype === 'image/mov'
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
const videoController = require('../controllers/elements/video');


////////////////////////////video
router.post('/add/:subcategoryID',upload.single('video'),videoController.add);
router.get('/gets/:subcategoryID',videoController.gets);
router.get('/get/:elementID',videoController.get);
router.put('/update/:elementID',upload.single('video'),videoController.update);
router.delete('/delete/:elementID',videoController.delete);





module.exports = router;