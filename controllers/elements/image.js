const path = require('path');
const fs = require('fs');



//wallpaper
const WASubCategory = require('../../models/wallpaper/WAsubcategory');
const WAimage = require('../../models/wallpaper/WAimage');


//facebook 
const FsubCategory = require('../../models/facebook/Fsubcategory');
const Fimage = require('../../models/facebook/Fimage');



//WhatsaApp image
const ImageSubCategorie = require('../../models/WhatsApp/image/ImageSubCategorie');
const WHimage = require('../../models/WhatsApp/image/WHimage');





exports.add = async (req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
    const type = req.body.type;
    const isHidden = req.body.isHidden;
    let image,destination;
    try
    {
        if(!isHidden || !req.files || req.files.length === 0)
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }
    if(type == 1) //facebook
    {
        var i =0;
        const subcategory = await FsubCategory.findByPk(subcategoryID);
        if(!subcategory)
        {
            const error = new Error('couldnt find facebook subCategory.');
            error.statusCode = 404;
            throw error;
        }
        while(req.files[i])
        {
            destination= req.files[i].destination.split('./public');
            image = destination[1]+'/'+req.files[i].filename;
           await subcategory.createFimage({
                image : image,
                isHidden : isHidden,
                sharing : 0
            })
            i++
        }
        res.status(201).json({
            message : 'image has been created'
        })  
    }
    else if(type == 2) // wallpaper
    {
        var i =0;
        const subcategory = await WASubCategory.findByPk(subcategoryID);
        if(!subcategory)
        {
            const error = new Error('couldnt find this wallpaper subCategory.');
            error.statusCode = 404;
            throw error;
        }
        while(req.files[i])
        {
            destination= req.files[i].destination.split('./public');
            image = destination[1]+'/'+req.files[i].filename;
           await subcategory.createWaimage({
                image : image,
                isHidden : isHidden,
                sharing : 0
            })
            i++
        }
        res.status(201).json({
            message : 'image has been created'
        })  
    }
    else if(type == 3) //WhatsApp image
    {

        var i =0;
        const subcategory = await ImageSubCategorie.findByPk(subcategoryID);
        if(!subcategory)
        {
            const error = new Error('couldnt find this whatsapp image subCategory.');
            error.statusCode = 404;
            throw error;
        }
        while(req.files[i])
        {
            destination= req.files[i].destination.split('./public');
            image = destination[1]+'/'+req.files[i].filename;
           await subcategory.createWhimage({
                image : image,
                isHidden : isHidden,
                sharing : 0
            })
            i++
        }
        res.status(201).json({
            message : 'image has been created'
        })  
    }
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
    const type = req.params.type;
    const subcategoryID = req.params.subcategoryID;
    if(type ==1) //facebook
    {
        Fimage.findAll({where : {fsubcategoryId : subcategoryID}})
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
    else if(type ==2) // wallpaper
    {
        WAimage.findAll({where : {wasubcategoryId	 : subcategoryID}})
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
     else if(type ==3) //WhatsApp image
    {
        WHimage.findAll({where : {imagesubcategorieId : subcategoryID}})
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
}
exports.get = (req,res,next) =>{
    const type = req.params.type;
    const elementID = req.params.elementID;
    if(type ==1) //facebook
    {
        Fimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this facebook image.');
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
    else if(type ==2) // wallpaper
    {
        WAimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this wallpaper image.');
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
    else if(type ==3) //WhatsApp image
    {
        WHimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this whatsapp image.');
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
}
exports.update = (req,res,next) =>{

    const isHidden = req.body.isHidden;
    const type = req.body.type;
    const elementID = req.params.elementID;
    var image ;
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
    if(type ==1) //facebook
    {
        Fimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this elements.');
                error.statusCode = 404;
                throw error;
            }
            if(req.file.filename){
            const destination= req.file.destination.split('./public');
            image = destination[1]+'/'+req.file.filename;
            }
            return element;
        })
        .then(element =>{
        if(element.image != image)
        {
            clearImage(element.image);
        }
        element.image = image;
        element.isHidden = isHidden;
        element.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the image has been updated'
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
    else if(type ==2) // wallpaper
    {
        WAimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this elements.');
                error.statusCode = 404;
                throw error;
            }
            if(req.file.filename){
                const destination= req.file.destination.split('./public');
                image = destination[1]+'/'+req.file.filename;
            }
            return element;
        })
        .then(element =>{
        if(element.image != image)
        {
            clearImage(element.image);
        }
        element.image = image;
        element.isHidden = isHidden;
        element.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the image has been updated'
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
    else if(type ==3) //WhatsApp image
    {
        WHimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this elements.');
                error.statusCode = 404;
                throw error;
            }
            if(req.file.filename){
                const destination= req.file.destination.split('./public');
                image = destination[1]+'/'+req.file.filename;
            }
            return element;
        })
        .then(element =>{
        if(element.image != image)
        {
            console.log("========")
            clearImage(element.image);
        }
        element.image = image;
        element.isHidden = isHidden;
        element.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the image has been updated'
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
}
exports.delete = (req,res,next) =>{
    const elementID = req.params.elementID;
    const type = req.body.type;
    try {
        if(!type || type > 3 || type < 1)
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
    if(type ==1) //facebook
    {
        Fimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(element.image);
            element.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'image has been deleted'
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
    else if(type ==2) // wallpaper
    {
        WAimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(element.image);
            element.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'image has been deleted'
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
    else if(type ==3) //WhatsApp image
    {
        WHimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(element.image);
            element.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'image has been deleted'
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
}


const clearImage = filePath => {
    filePath = path.join(__dirname, '../../public', filePath);
    fs.unlink(filePath, err => console.log());
  };
