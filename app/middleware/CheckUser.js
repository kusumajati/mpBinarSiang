var User =require('../models/user.model')
var Response = require('../middleware/Response')

exports.create = (req,res, next)=>{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            Response(res,false,"username is taken", null, 400)
        }else{
            next()
        }

    })
    .catch(err=>{
        
        Response(res,false,'error from CheckUser middleware',err, 500)
    })
}

exports.update = (req,res, next)=>{
if(String(req.username)=== String(req.body.username)){
    next()
}else{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            Response(res,false,"username is taken", null, 400)

        }
        else{
            next()
        }

    })
    .catch(err=>{
        
        Response(res,false,'error from CheckUser middleware',err, 500)

    })
}
    
}

