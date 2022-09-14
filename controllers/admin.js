const User = require('../models/user');

//wallpaper
const WAimage = require('../models/wallpaper/WAimage');


//facebook 
const Fimage = require('../models/facebook/Fimage');


//Quotes
const Quete = require('../models/Quotes Section/quete');

//WhatsaApp image
const WHimage = require('../models/WhatsApp/image/WHimage');



//WhatsaApp text

const Text = require('../models/WhatsApp/text/text');



//WhatsaApp video
const Video = require('../models/WhatsApp/video/video');



//////////////////////////////////////////////// user
exports.add_user = (req,res,next) =>{
    const username = req.body.username;
    const password = req.body.password;
    const insert = req.body.insert;
    const delet = req.body.delete;
    const view = req.body.view;
    const isHidden = req.body.isHidden;
    const levelOfTheUser = req.body.levelOfTheUser;


    User.findOne({where : {username : username}})
    .then(user =>{
        if(user)
        {
            const error = new Error('you alreday have a user with this username');
            error.statusCode = 404;
            throw error;
        }
        User.create({
            username : username,
            password : password,
            insert : insert,
            delete : delet,
            view : view,
            isHidden : isHidden,
            levelOfTheUser : levelOfTheUser
        })
    })
    .then(() =>{
        res.status(201).json({
            message : 'the user has been created'
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

exports.get_users = (req,res,next)=>{
    User.findAll()
    .then(users =>{
        if(!users)
        {
            const error = new Error('thier is no users');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send(users);
    })
    .catch(err =>{
        if(!err.statusCode)
        {
        err.status = 500;
        }
        next(err);
    });
}

exports.get_user = (req,res,next) =>{
    const userID = req.params.userID;
    User.findByPk(userID)
    .then(user =>{
        if(!user)
        {
            const error = new Error('Could not find this user.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send(user);
    })
    .catch(err =>{
        if(!err.statusCode)
        {
        err.status = 500;
        }
        next(err);
    });
}

exports.update_user = (req,res,next) =>{
    const userID = req.params.userID;
    const username = req.body.username;
    const password = req.body.password;
    const insert = req.body.insert;
    const delet = req.body.delete;
    const view = req.body.view;
    const isHidden = req.body.isHidden;
    const levelOfTheUser = req.body.levelOfTheUser;
    var temp_user;
    User.findByPk(userID)
    .then(user =>{
        if(!user)
        {
            const error = new Error('Could not find this user.');
            error.statusCode = 404;
            throw error;
        }
        temp_user = user;
        return User.findAll({where : {username : username}})  
    })
    .then(number_of_thisname =>{
        if (number_of_thisname.length === 0 || ((number_of_thisname.length === 1) && number_of_thisname[0].id === temp_user.id ))
        {   
            temp_user.username = username;
            temp_user.password = password;
            temp_user.insert = insert;
            temp_user.delete = delet;
            temp_user.view = view;
            temp_user.isHidden = isHidden;
            temp_user.levelOfTheUser = levelOfTheUser;
            temp_user.save();
        }
        else 
        {
            const error = new Error('you already have a user with this username.');
            error.statusCode = 404;
            throw error;  
        }
    })
    .then(() =>{
        res.status(200).json({
            message: 'the user has been updated'
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

exports.delete_user = (req,res,next) =>{
    const userID = req.params.userID;
    User.findByPk(userID)
    .then(user =>{
        if(!user)
        {
            const error = new Error('Could not find this user.');
            error.statusCode = 404;
            throw error;
        }
        user.destroy();
    })
    .then(() =>{
        res.status(200).json({
            message : 'the user has been deleted'
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

/////////////////////////////////////////////////////////////sharing
exports.sharing = (req,res,next) =>{
    const elementID = req.params.elementID;
    const type = req.body.type;
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
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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
        Fimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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
        WAimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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
        WHimage.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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
        Text.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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
        Video.findByPk(elementID)
        .then(element =>{
            if(!element)
            {
                const error = new Error('Could not find this element.');
                error.statusCode = 404;
                throw error;
            }
            element.sharing ++;
            element.save();
        })
        .then(() =>{
            res.status(200).json({
                message : "sharing added one"
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



