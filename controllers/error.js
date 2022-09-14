const error = require('../models/error');

exports.add = (req,res,next) =>{
try{
    const message = req.body.message;
    const TypeOfError = req.body.TypeOfError;
    error.create({
        message : message,
        TypeOfError : TypeOfError
    })
    .then(() =>{
        res.status(200).json({
            message : "the error has been created"
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
catch(err)
{
    if (!err.statusCode) {
        err.statusCode = 500;
        }
    next(err);
}
}

exports.get = (req,res,next) =>{
    error.findAll()
    .then(errors =>{
        if(!errors || errors.length === 0)
        {
            const error = new Error('thier are no errors');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send(errors);
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
    const errorID = req.params.errorID;
    console.log(errorID);
    error.findByPk(errorID)
    .then(err =>{
        if(!err)
        {
            const error = new Error('couldnt find this error');
            error.statusCode = 404;
            throw error;
        }
        err.destroy();
    })
    .then(() =>{
        res.status(200).json({
           message :'error has been deleted'
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