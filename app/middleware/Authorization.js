var Product = require('../models/product.model')
var Response = require('./Response')
var User = require('../models/user.model')
var Review = require('../models/review.model')

exports.product = (req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>{
        if(String(req.userId) == String(product.user)){
            next()
        }else{
            Response(res, false, "your not authorized",null, 401)
        }
        
    })
    .catch(err=>{
        Response(res,false,"something went wrong from ProductAuth", err, 500)
    })
}

exports.user = (req,res,next)=>{
    if(req.userId == req.params.id){
       next()
    }else{
        Response(res, false, "your not authorized", null, 401)
    }
}

exports.review = async (req,res,next)=>{
    try{
       var review = await Review.findById(req.params.id)
        if(String(review.user)=== String(req.userId)){
            req.productId = review.product
            next()
        }else{
            Response(res,false,"your not authorized",null, 401)
        }

}catch(err){
        Response(res,false,"error from authorization", null, 500)
    }
}