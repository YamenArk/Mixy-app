const path = require('path');
const fs = require('fs');



//WhatsaApp video
const VideoSubCategorie = require('../../models/WhatsApp/video/VideoSubCategorie');
const Video = require('../../models/WhatsApp/video/video');



exports.add = async(req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
    const isHidden = req.body.isHidden;
    try
    {
        if(!isHidden || !req.file )
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }   
        const subcategory = await VideoSubCategorie.findByPk(subcategoryID);
        if(!subcategory)
        {
            const error = new Error('couldnt find video subCategory.');
            error.statusCode = 404;
            throw error;
        }
        destination= req.file.destination.split('./public');
        const videoo = destination[1]+'/'+req.file.filename;
        await subcategory.createVideo({
            video : videoo,
            isHidden : isHidden,
            sharing : 0
        })
        res.status(201).json({
            message : 'video has been created'
        })  
    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    }
    
    
}
exports.gets = (req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
   
    Video.findAll({where : {videosubcategorieId	 : subcategoryID}})
    .then(elements =>{
        if(!elements || elements.length === 0)
        {
            const error = new Error('thier are no elements');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send(elements);
    })
    .catch(err =>{
        if(!err.statusCode)
        {
        err.status = 500;
        }
        next(err);
    }); 

    
}
exports.get = (req,res,next) =>{
    const elementID = req.params.elementID;
    Video.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this video.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(element);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });       
 
}
exports.update = (req,res,next) =>{
    const isHidden = req.body.isHidden;
    const elementID = req.params.elementID;
    var video;
    try {
        if(!isHidden || !req.file )
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }
        }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
            }
        next(err);
    }
    Video.findByPk(elementID)
    .then(element =>{
        if(!element)
        {
            const error = new Error('Could not find this video.');
            error.statusCode = 404;
            throw error;
        }
        if(req.file.filename){
        const destination= req.file.destination.split('./public');
        video = destination[1]+'/'+req.file.filename;
        }
        return element;
    })
    .then(element =>{
    if(element.video != video)
    {
        clearVideo(element.video);
    }
    element.video = video;
    element.isHidden = isHidden;
    element.save();
})
.then(() =>{
    res.status(200).json({
        message: 'the video has been updated'
    });
})
.catch(err =>{
    if(!err.statusCode)
    {
    err.status = 500;
    }
    next(err);
});

}
exports.delete = (req,res,next) =>{
    const elementID = req.params.elementID;
    Video.findByPk(elementID)
    .then(element =>{
        if(!element)
        {
            const error = new Error('Could not find this video.');
            error.statusCode = 404;
            throw error;
        }
        clearVideo(element.video);
        element.destroy();
    })
    .then(() =>{
        res.status(200).json({
            message : 'video has been deleted'
        })
    })
    .catch(err =>{
        if(!err.statusCode)
        {
        err.status = 500;
        }
        next(err);
    });
    
}


const clearVideo = filePath => {
    filePath = path.join(__dirname, '../../public', filePath);
    fs.unlink(filePath, err => console.log());
  };