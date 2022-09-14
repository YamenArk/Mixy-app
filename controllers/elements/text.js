//Quotes
const Qsubcategory = require('../../models/Quotes Section/qsubcategory');
const Quete = require('../../models/Quotes Section/quete');


//WhatsaApp text
const TextSubCategory = require('../../models/WhatsApp/text/TextSubCategory');
const Text = require('../../models/WhatsApp/text/text');




exports.add = (req,res,next) =>{
    const subcategoryID = req.params.subcategoryID;
    const type = req.body.type;
    const isHidden = req.body.isHidden;
    if(!isHidden || !type || type > 2 || type < 1)
    {
        const error = new Error(' Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if(type ==1) //Quotes Section
    { 
        const Quotes = req.body.quotes;
        if(!Quotes)
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;    
        }
        Qsubcategory.findByPk(subcategoryID)
        .then(subcategory =>{
            if(!subcategory)
            {
                const error = new Error('Could not find subcategory');
                error.statusCode = 404;
                throw error; 
            }
            subcategory.createQuete({
                Quotes : Quotes,
                isHidden : isHidden,
                sharing : 0
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'Quotes has been created'
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
    else if(type ==2) // WhatsApp text   
    {
        const text = req.body.text;
        if(!text || !isHidden)
        {
            const error = new Error(' Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;    
        }
        TextSubCategory.findByPk(subcategoryID)
        .then(subcategory =>{
            if(!subcategory)
            {
                const error = new Error('Could not find subcategory');
                error.statusCode = 404;
                throw error; 
            }
            subcategory.createText({
                text : text,
                isHidden : isHidden,
                sharing : 0
            })
        })
        .then(() =>{
            res.status(201).json({
                message : 'text has been created'
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
exports.gets = (req,res,next) =>{
    const type = req.params.type;
    const subcategoryID = req.params.subcategoryID;
    if(type ==1) //Quotes Section
    {
        Quete.findAll({where : {qsubcategoryId : subcategoryID}})
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
    else if(type ==2) // WhatsApp text   
    {
        Text.findAll({where : {textsubcategoryId : subcategoryID}})
        .then(elements =>{
            console.log("========")
            console.log(elements)

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
    const elementID = req.params.elementID;
    const type = req.params.type;
    if(type ==1) //Quotes Section
    {
        Quete.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
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
    else if(type ==2) // WhatsApp text   
    {
        Text.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
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
    const elementID = req.params.elementID;
    const isHidden = req.body.isHidden;
    const type = req.body.type;
    if(type ==1) //Quotes Section
    {
        const quotes = req.body.quotes;
        Quete.findByPk(elementID)
        .then(element =>{
        if(!element)
        {
            const error = new Error('Could not find this element.');
            error.statusCode = 404;
            throw error;
        }
        element.Quotes = quotes;
        element.isHidden = isHidden;
        element.save();
        })
        .then(() =>{
            res.status(200).json({
                message: 'the element has been updated'
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
    else if(type ==2) //WhatsApp text  
    {
        const text = req.body.text;
        Text.findByPk(elementID)
        .then(element =>{
        if(!element)
        {
            const error = new Error('Could not find this text.');
            error.statusCode = 404;
            throw error;
        }
        element.text = text;
        element.isHidden = isHidden;
        element.save();
        })
        .then(() =>{
            res.status(200).json({
                message: 'the element has been updated'
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
    const type = req.body.type;
    const elementID = req.params.elementID;
    if(type ==1) //Quotes Section
    {
        Quete.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this Quotes.');
                error.statusCode = 404;
                throw error;
            }
            element.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'element has been deleted'
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
    else if(type ==2) // WhatsApp text   
    {
        Text.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this text.');
                error.statusCode = 404;
                throw error;
            }
            element.destroy();
        })
        .then(() =>{
            res.status(200).json({
                message : 'element has been deleted'
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
