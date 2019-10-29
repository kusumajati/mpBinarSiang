var jwt = require('jsonwebtoken')
var Response = require('./Response')
var jwt_pass = 'this is a secret..'
var User = require('../models/user.model')

module.exports = (req,res, next) =>{
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization, jwt_pass, (err,decoded)=>{
            if(err){
                Response(res,false,"error from jwt verify",err, 500)

            }else{
                // res.send(decoded)
                User.findById(decoded.id)
                .then(user=>{
                    // res.send(user)
                    if(user){
                        req.userId = user._id
                        req.username = user.username
                        
                        next()
                    }else{
                        Response(res,false,"user not found",null,404)
                    }
                }).catch(errUser=>{
                    Response(res,false,"error from Authentication",errUser, 500)
                })
            }
            
        })
    }else{
        Response(res, false, "token is required", null, 401)
    }

}