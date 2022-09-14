const path = require('path');
const fs = require('fs');


//wallpaper
const WAcategory = require('../models/wallpaper/WAcategory');
const WASubCategory = require('../models/wallpaper/WAsubcategory');


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
const TextSubCategory = require('../models/WhatsApp/text/TextSubCategory');




//WhatsaApp video
const VideoCategorie = require('../models/WhatsApp/video/VideoCategorie');
const VideoSubCategorie = require('../models/WhatsApp/video/VideoSubCategorie');




exports.add_sub_category = (req,res,next) =>{
    
    const type = req.body.type;
    const categoryID = req.params.categoryID;
    const name = req.body.SubCategory;
    var image;
    const isHidden = req.body.isHidden;
    try
    {
        if(!isHidden || !name || !req.file || !categoryID)
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
    if(req.file.filename){    
        const destination= req.file.destination.split('./public');
        image = destination[1]+'/'+req.file.filename;
    }
            
    if(type ==1) //Quotes Section
    {
        Qsubcategory.findOne({where : {name : name,qcategoryId : categoryID}})
        .then(subcategory =>{  
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }          
        })
        .then(() =>{
            return  Qcategory.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            category.createQsubcategory({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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
    else if(type ==2) //facebook
    {
        FsubCategory.findOne({where : {name : name,fcategoryId : categoryID}})
        .then(subcategory =>{
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }

        })
        .then(() =>{
            return  Fcategory.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            const path = './public/images/facebook/'+name
            createFolder(path)
            category.createFsubcategory({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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
    else if(type ==3) // wallpaper
    {
        WASubCategory.findOne({where : {name : name,wacategoryId : categoryID}})
        .then(subcategory =>{
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }
        })
        .then(() =>{
            return  WAcategory.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            const path = './public/images/wallpaper/'+name
            createFolder(path)
            category.createWasubcategory({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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
    else if(type ==4) //WhatsApp image
    {
        ImageSubCategorie.findOne({where : {name : name,imagecategorieId : categoryID}})
        .then(subcategory =>{
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }
        })
        .then(() =>{
            return  ImageCategorie.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            const path = './public/images/WhatsAppImage/'+name
            createFolder(path)
            category.createImagesubcategorie({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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
    else if(type ==5) // WhatsApp text   
    {
        TextSubCategory.findOne({where : {name : name,textcategoryId : categoryID}})
        .then(subcategory =>{
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }
        })
        .then(() =>{
            return  TextCategory.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            category.createTextsubcategory({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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
    else if(type ==6) //WhatsApp video 
    {
        VideoSubCategorie.findOne({where : {name : name,videocategorieId : categoryID}})
        .then(subcategory =>{
            if(subcategory)
            {
                const error = new Error('you alredy have a subcategory with this name');
                error.statusCode = 404;
                throw error;    
            }
        })
        .then(() =>{
            return  VideoCategorie.findByPk(categoryID)
        })
        .then(category =>{
            if(!category)
            {
                const error = new Error('the categoryID is not exist');
                error.statusCode = 404;
                throw error;    
            }
            const path = './public/images/WhatsAppVideo/'+name
            createFolder(path)
            category.createVideosubcategorie({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'sub category has been created'
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

exports.get_sub_categorys = (req,res,next) =>{
    const type = req.params.type;
    const categoryID = req.params.categoryID;
    try {
        if(!type || type > 6 || type < 1)
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
    if(type ==1) //Quotes Section
    {
        Qsubcategory.findAll({where : {qcategoryId : categoryID}})
        .then(subcategorys =>{
            if(!subcategorys ||  subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==2) //facebook
    {
        FsubCategory.findAll()
        .then(subcategorys =>{
            if(!subcategorys ||  subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==3) // wallpaper
    {
        WASubCategory.findAll()
        .then(subcategorys =>{
            if(!subcategorys || subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==4) //WhatsApp image
    {
        ImageSubCategorie.findAll()
        .then(subcategorys =>{
            if(!subcategorys || subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==5) // WhatsApp text   
    {
        TextSubCategory.findAll()
        .then(subcategorys =>{
            if(!subcategorys || subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==6) //WhatsApp video 
    {
        VideoSubCategorie.findAll()
        .then(subcategorys =>{
            if(!subcategorys || subcategorys.length === 0)
            {
                const error = new Error('thier are no subcategorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
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

exports.get_sub_category = (req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
    const type = req.params.type;
    try {
        if(!type || type > 6 || type < 1)
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
    if(type ==1) //Quotes Section
    {
        Qsubcategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==2) //facebook
    {
        FSubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==3) // wallpaper
    {
        WASubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==4) //WhatsApp image
    {
        ImageSubCategorie.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==5) // WhatsApp text   
    {
        TextSubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
        })
        .catch(err =>{
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        });
    }
    else if(type ==6) //WhatsApp video 
    {
        VideoSubCategorie.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(subcategorys);
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

exports.update_sub_category = (req,res,next) =>{    
    const subcategoryID = req.params.subcategoryID;
    const name = req.body.SubCategory;
    const type = req.body.type;
    var image;
    var subcategorys;
    const isHidden = req.body.isHidden;
    try {
        if(!isHidden || !name || !req.file )
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
    if(type ==1) //Quotes Section
    {
        Qsubcategory.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }

             return Qsubcategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
        subcategorys.name = name;
        if(subcategorys.image != image)
        {
            clearImage(subcategorys.image);
        }
        subcategorys.image = image;
        subcategorys.isHidden = isHidden;
        subcategorys.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the subcategorys has been updated'
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
    else if(type ==2) //facebook
    {
        FsubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            return FsubCategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
            if(subcategorys.name != name)
            {

                const path = './images/facebook/'+subcategorys.name
                updateFolder(path,subcategorys.name,name);    
            }
            subcategorys.name = name;
            if(subcategorys.image != image)
            {
                clearImage(subcategorys.image);
            }
            subcategorys.image = image;
            subcategorys.isHidden = isHidden;
            subcategorys.save();
        })
        .then(() =>{
            res.status(200).json({
                message: 'the subcategorys has been updated'
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
    else if(type ==3) // wallpaper
    {
        WASubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            return WASubCategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
        if(subcategorys.name != name)
        {
            const path = './images/wallpaper/'+subcategorys.name
            updateFolder(path,subcategorys.name,name);    
        }
        subcategorys.name = name;
        if(subcategorys.image != image)
        {
            clearImage(subcategorys.image);
        }
        subcategorys.image = image;
        subcategorys.isHidden = isHidden;
        subcategorys.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the subcategorys has been updated'
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
    else if(type ==4) //WhatsApp image
    {
        ImageSubCategorie.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            return ImageSubCategorie.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
            if(subcategorys.name != name)
            {
                const path = './images/WhatsAppImage/'+subcategorys.name
                updateFolder(path,subcategorys.name,name);    
            }
            subcategorys.name = name;
            if(subcategorys.image != image)
            {
                clearImage(subcategorys.image);
            }
            subcategorys.image = image;
            subcategorys.isHidden = isHidden;
            subcategorys.save();
        })
        .then(() =>{
            res.status(200).json({
                message: 'the subcategorys has been updated'
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
    else if(type ==5) // WhatsApp text   
    {
        TextSubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            return TextSubCategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
        if(!subcategorys)
        {
            const error = new Error('Could not find this subcategorys.');
            error.statusCode = 404;
            throw error;
        }
        subcategorys.name = name;
        if(subcategorys.image != image)
        {
            clearImage(subcategorys.image);
        }
        subcategorys.image = image;
        subcategorys.isHidden = isHidden;
        subcategorys.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the subcategorys has been updated'
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
    else if(type ==6) //WhatsApp video 
    {
        VideoSubCategorie.findByPk(subcategoryID)
        .then(subcategory =>{
            subcategorys = subcategory;
            if(!subcategory)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            return VideoSubCategorie.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === subcategorys.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                        const destination= req.file.destination.split('./public');
                        image = destination[1]+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a subcategory with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(() =>{
            if(subcategorys.name != name)
            {
                const path = './images/WhatsAppVideo/'+subcategorys.name
                console.log(subcategorys.name+"============"+name)
                updateFolder(path,subcategorys.name,name);    
            }
            subcategorys.name = name;
            if(subcategorys.image != image)
            {
                clearImage(subcategorys.image);
            }
            subcategorys.image = image;
            subcategorys.isHidden = isHidden;
            subcategorys.save();
        })
        .then(() =>{
            res.status(200).json({
                message: 'the subcategorys has been updated'
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

exports.delete_sub_category = (req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
    const type = req.body.type;
    try {
        if(!type || type > 6 || type < 1)
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
    if(type ==1) //Quotes Section
    {
        Qsubcategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    else if(type ==2) //facebook
    {
        FsubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/facebook/'+subcategorys.name
            clearFile(path)
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    else if(type ==3) // wallpaper
    {
        WASubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/wallpaper/'+subcategorys.name
            clearFile(path); 
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    else if(type ==4) //WhatsApp image
    {
        ImageSubCategorie.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/WhatsAppImage/'+subcategorys.name
            clearFile(path);    
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    else if(type ==5) // WhatsApp text   
    {
        TextSubCategory.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    else if(type ==6) //WhatsApp video 
    {
        VideoSubCategorie.findByPk(subcategoryID)
        .then(subcategorys =>{
            if(!subcategorys)
            {
                const error = new Error('Could not find this subcategorys.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/WhatsAppVideo/'+subcategorys.name
            clearFile(path);  
            clearImage(subcategorys.image);
            subcategorys.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'subcategorys has been deleted'
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
    filePath = path.join(__dirname, '../public', filePath);
    fs.unlink(filePath, err => console.log());
  };


const createFolder = path =>{
    fs.mkdir(path ,{ recursive: true }, (err) => {
        if (err) throw err;
      });
}

const updateFolder = (filePath,old_name,new_name) =>{
filePath = path.join(__dirname, '../public', filePath);
newfilePath = filePath.replace(old_name,new_name);
fs.rename(filePath, newfilePath, (err) => { 
});
}


const clearFile = filePath => {
filePath = path.join(__dirname, '../public', filePath);
console.log(filePath);
fs.rmdir(filePath, { recursive: true }, err => console.log());
};