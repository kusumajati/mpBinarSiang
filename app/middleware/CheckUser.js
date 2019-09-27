var User =require('../models/user.model')
var Response = require('../middleware/Response')

exports.create = (req,res, next)=>{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            res.json({
                success:false,
                message: "username is taken",
            })
        }else{
            next()
        }

    })
    .catch(err=>{
        
        res.json({
            success:false,
            message: "cannot create user",
            data:err
        })
    })
}

exports.update = (req,res, next)=>{
if(String(req.username)=== String(req.body.username)){
    next()
}else{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            Response(res, false, 'username is taken')

        }
        else{
            next()
        }

    })
    .catch(err=>{
        
        res.json({
            success:false,
            message: "cannot create user",
            data:err
        })
    })
}
    
}

