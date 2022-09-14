const path = require('path');
const fs = require('fs');



//Quotes Section
const Qcategory = require('../models/Quotes Section/Qcategory');

//wallpaper
const WAcategory = require('../models/wallpaper/WAcategory');
const WASubCategory = require('../models/wallpaper/WAsubcategory');


//facebook 
const Fcategory = require('../models/facebook/Fcategory');
const FsubCategory = require('../models/facebook/Fsubcategory');


//WhatsaApp image
const ImageCategorie = require('../models/WhatsApp/image/ImageCategorie');
const ImageSubCategorie = require('../models/WhatsApp/image/ImageSubCategorie');


//WhatsaApp text

const TextCategory = require('../models/WhatsApp/text/TextCategory');



//WhatsaApp video
const VideoCategorie = require('../models/WhatsApp/video/VideoCategorie');
const VideoSubCategorie = require('../models/WhatsApp/video/VideoSubCategorie');



exports.add_category =(req,res,next) =>{
    const name = req.body.CategorName;
    const isHidden = req.body.isHidden;
    const type = req.body.type;
    try
    {
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
        Qcategory.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                   return image = req.newpath+'/'+req.file.filename;
                }
            }
            
        })
        .then(image =>{
            const path = './public/images/subCategory/Quotes/'+name
            createFolder(path)
            Qcategory.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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
        Fcategory.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                 return image = req.newpath+'/'+req.file.filename;
                }
            }
        })
        .then(image =>{
            const path = './public/images/subCategory/facebook/'+name
            createFolder(path)
            Fcategory.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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
        WAcategory.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                  return image = req.newpath+'/'+req.file.filename;
                }
            }
        })
        .then(image =>{
            const path = './public/images/subCategory/wallpaper/'+name
            createFolder(path)
            WAcategory.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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
        ImageCategorie.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                  return image = req.newpath+'/'+req.file.filename;
                }
            }
        })
        .then(image =>{
            const path = './public/images/subCategory/WhatsAppImage/'+name
            createFolder(path)
            ImageCategorie.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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
        TextCategory.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                  return image = req.newpath+'/'+req.file.filename;
                }
            }
        })
        .then(image =>{
            const path = './public/images/subCategory/WhatsAppText/'+name
            createFolder(path)
            TextCategory.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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
        VideoCategorie.findOne({where :{ name : name}})
        .then(category =>{
            if(category)
            {
                const error = new Error('you alreday have a category with this name');
                error.statusCode = 404;
                throw error;
            }
            if(req.file)
            {
                if(req.file.filename){
                return  image = req.newpath+'/'+req.file.filename;
                }
            }
        })
        .then(image =>{
            const path = './public/images/subCategory/WhatsAppVideo/'+name
            createFolder(path)
            VideoCategorie.create({
                name : name,
                image : image,
                isHidden : isHidden
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'category has been created'
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

exports.get_categorys = (req,res,next)=>{
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
        Qcategory.findAll()
        .then(categorys =>{
            if(!categorys ||  categorys.length === 0)
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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
        Fcategory.findAll()
        .then(categorys =>{
            if(!categorys ||  categorys.length === 0)
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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
        WAcategory.findAll()
        .then(categorys =>{
            if(!categorys ||  categorys.length === 0)
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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
        ImageCategorie.findAll()
        .then(categorys =>{
            if(!categorys ||  categorys.length === 0)
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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
        TextCategory.findAll()
        .then(categorys =>{
            if(!categorys || categorys.length === 0 )
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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
        VideoCategorie.findAll()
        .then(categorys =>{
            console.log(categorys);
            if(!categorys || categorys.length === 0 )
            {
                const error = new Error('thier are no categorys');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(categorys);
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

exports.get_category = (req,res,next) =>{
    const categoryID = req.params.categoryID;
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
        Qcategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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
        Fcategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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
        WAcategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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
        ImageCategorie.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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
        TextCategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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
        VideoCategorie.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send(category);
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

exports.update_category = (req,res,next) =>{
    const name = req.body.CategorName;
    const isHidden = req.body.isHidden;
    const type = req.body.type;
    const categoryID = req.params.categoryID;
    var category;
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
        Qcategory.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
        category = categorys;
        return Qcategory.findAll({where : {name : name}})
            
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
            if(category.name != name)
            {
                const path = '/images/subCategory/Quotes/'+category.name;
                updateFolder(path,category.name,name);
            } 
            category.name = name;
            if(category.image != image)
            {
                clearImage(category.image);
            }
            category.image = image;
            category.isHidden = isHidden;
            category.save();
         })
        .then(() =>{
            res.status(200).json({
                message: 'the category has been updated'
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
        Fcategory.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('couldnt find this catergory.');
                error.statusCode = 404;
                throw error;
            }
            category = categorys;
         return Fcategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
        if(category.name != name)
        {
            const path = '/images/subCategory/facebook/'+category.name;
            updateFolder(path,category.name,name);
        } 
        category.name = name;
        if(category.name != name)
        {
            updateFolder(category.image,category.name,name);
        }    
        if(category.image != image)
        {
            clearImage(category.image);
        }
        category.image = image;
        category.isHidden = isHidden;
        category.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the category has been updated'
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
        WAcategory.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('couldnt find this catergory.');
                error.statusCode = 404;
                throw error;
            }
            category = categorys;
            return WAcategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
        if(category.name != name)
        {
            const path = '/images/subCategory/wallpaper/'+category.name;
            updateFolder(path,category.name,name);
        } 
        category.name = name;
        if(category.image != image)
        {
            clearImage(category.image);
        }
        category.image = image;
        category.isHidden = isHidden;
        category.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the category has been updated'
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
        ImageCategorie.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('couldnt find this catergory.');
                error.statusCode = 404;
                throw error;
            }
            category = categorys;
            return ImageCategorie.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
        if(category.name != name)
        {
            const path = '/images/subCategory/WhatsAppImage/'+category.name;
            updateFolder(path,category.name,name);
        } 
        category.name = name;
        if(category.image != image)
        {
            clearImage(category.image);
        }
        category.image = image;
        category.isHidden = isHidden;
        category.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the category has been updated'
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
        TextCategory.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('couldnt find this catergory.');
                error.statusCode = 404;
                throw error;
            }
            category = categorys;
            return TextCategory.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
        if(category.name != name)
        {
            const path = '/images/subCategory/WhatsAppText/'+category.name;
            updateFolder(path,category.name,name);
        } 
        category.name = name;
        if(category.image != image)
        {
            clearImage(category.image);
        }
        category.image = image;
        category.isHidden = isHidden;
        category.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the category has been updated'
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
        VideoCategorie.findByPk(categoryID)
        .then(categorys =>{
            if(!categorys)
            {
                const error = new Error('couldnt find this catergory.');
                error.statusCode = 404;
                throw error;
            }
            category = categorys;
            return VideoCategorie.findAll({where : {name : name}})
        })
        .then(number_of_thisname =>{
            if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === category.id ))
            {   
                if(req.file)
                {
                    if(req.file.filename){
                    return image = req.newpath+'/'+req.file.filename;
                    }
                }
            }
            else 
            {

                const error = new Error('you already have a category with this name.');
                error.statusCode = 404;
                throw error;
            }
        })
        .then(image =>{
        if(category.name != name)
        {
            const path = '/images/subCategory/WhatsAppVideo/'+category.name;
            updateFolder(path,category.name,name);
        } 
        category.name = name;
        if(category.image != image)
        {
            clearImage(category.image);
        }
        category.image = image;
        category.isHidden = isHidden;
        category.save();
    })
    .then(() =>{
        res.status(200).json({
            message: 'the category has been updated'
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

exports.delete_category = async(req,res,next) =>{
    const categoryID = req.params.categoryID;
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
        Qcategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/Quotes/'+category.name
            clearFolder(path);
            clearImage(category.image);
            category.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'category has been deleted'
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
        try{

            var childpath;
            const category = await Fcategory.findByPk(categoryID)
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/facebook/'+category.name
            clearFolder(path);
            clearImage(category.image);
            const subcategory = await FsubCategory.findAll()
            var i =0;
            while(subcategory[i])
            {
                childpath = await './images/facebook/'+subcategory[i].name;
                clearFolder(childpath)
                i++;
            }
            await category.destroy();
            res.status(200).json({
                message : 'category has been deleted'
            })
        }
        catch(err)
            {
            if(!err.statusCode)
            {
            err.status = 500;
            }
            next(err);
        };
    }
    else if(type ==3) // wallpaper
    {
        var childpath;
        var temp_category;
        WAcategory.findByPk(categoryID)
        .then(category =>{
            temp_category = category;
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/wallpaper/'+category.name
            clearFolder(path);
            clearImage(category.image);
            return WASubCategory.findAll()
        })
        .then(subcategory =>{
            var i =0;
            while(subcategory[i])
            {
                childpath = './images/wallpaper/'+subcategory[i].name;
                clearFolder(childpath)
                i++;
            }
        })
        .then(() =>{
            temp_category.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'category has been deleted'
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
        var childpath;
        var temp_category;
        ImageCategorie.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/WhatsAppImage/'+category.name
            clearFolder(path);
            clearImage(category.image);
            return ImageSubCategorie.findAll()
        })
        .then(subcategory =>{
            var i =0;
            while(subcategory[i])
            {
                childpath = './images/WhatsAppImage/'+subcategory[i].name;
                clearFolder(childpath)
                i++;
            }
        })
        .then(() =>{
            temp_category.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'category has been deleted'
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
        TextCategory.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/WhatsAppText/'+category.name
            clearFolder(path);
            clearImage(category.image);
            category.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'category has been deleted'
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
        var childpath;
        var temp_category;
        VideoCategorie.findByPk(categoryID)
        .then(category =>{
            if(!category)
            {
                const error = new Error('Could not find this category.');
                error.statusCode = 404;
                throw error;
            }
            const path = './images/subCategory/WhatsAppVideo/'+category.name
            clearFolder(path);
            clearImage(category.image);
            return VideoSubCategorie.findAll()
        })
        .then(subcategory =>{
            var i =0;
            while(subcategory[i])
            {
                childpath = './images/WhatsAppVideo/'+subcategory[i].name;
                clearFolder(childpath)
                i++;
            }
        })
        .then(() =>{
            temp_category.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'category has been deleted'
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


const createFolder = path =>{
    fs.mkdir(path ,{ recursive: true }, (err) => {
        if (err) throw err;
      });
}

const updateFolder = (filePath,old_name,new_name) =>{
    filePath = path.join(__dirname, '../public', filePath);
    newfilePath = filePath.replace(old_name,new_name);
    fs.rename(filePath, newfilePath, (err) => {
        console.log(err)
    });
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '../public', filePath);
    fs.unlink(filePath, err => console.log());
    // fs.rmdir(filePath, { recursive: true }, err => console.log(err));
  };

const clearFolder = filePath => {
filePath = path.join(__dirname, '../public', filePath);
fs.rmdir(filePath, { recursive: true }, err => console.log());
};
