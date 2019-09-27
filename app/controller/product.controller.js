var Product = require('../models/product.model')
var User = require('../models/user.model')
var Response = require('../middleware/Response')


exports.productCreate = (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        user: req.userId
    })
        .then(product => {
            User.findById(req.userId)
            .then(user=>{
                user.products.push(product._id)
                user.products[0]== null? user.products.splice(0,1):null
                user.save()
                Response(res, true, "product created", product)
            }).catch(errUser=>{
                Response(res, false, "something went wrong", errUser)
            })
        })
        .catch(err => {
            Response(res, false, "cannot create product", err)
        })
}

exports.productShowAll = (req, res) => {
    Product.find({}).then(products => {
        res.json({
            success: true,
            message: "products retrieved",
            data: products
        })

    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find product",
            data: err
        })
    })

}

exports.productShow = (req, res) => {
    Product.findById(req.params.id)
    .populate({
        path:'user',
        select:"username"
    })
    .then(product => {
        res.json({
            success: true,
            message: "product retrieved",
            data: product
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find product",
            data: err
        })
    })
}

exports.productDelete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, {useFindAndModify:false
    })
    .then(product=>{
        User.findByIdAndUpdate(req.userId, {$pull:{products:{$in:product._id}}})
        .then(()=>{
            Response(res,true,"product deleted", product)
        })
        .catch(errUser=>{
            Response(res,false,"something went wrong from handler User",errUser)
        })
    })
    .catch(err=>{
        Response(res,false,"something went wrong from handler",err)
    })

}

exports.productUpdate = (req,res)=>{
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true})
    .then(product=>{
        Response(res, true, "product updated", product)
    })
    .catch(err=>{
        Response(res, false, "error from product update handler", err )
    })
}