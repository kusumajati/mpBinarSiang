var Review = require('../models/review.model')
var User = require('../models/user.model')
var Response = require('../middleware/Response')
var Product = require('../models/product.model')

exports.reviewCreate = async (req, res) => {
    //    Review.create({
    //        text:req.body.text,
    //        user:req.userId,
    //        product: req.query.productId
    //    }).then(review=>{
    //        User.findByIdAndUpdate(review.user, {$push:{reviews:review._id}},{useFindAndModify:false})
    //        .then(()=>{
    //         Product.findByIdAndUpdate(review.product, {$push:{reviews:review._id}},{useFindAndModify:false})
    //         .then(()=>{
    //             Response(res, true, "review created", review)
    //         }).catch(errProduct=>{
    //             Response(res,false,'error from product handler', errProduct)
    //         })
    //        }).catch(errUser=>{
    //            Response(res,false,"err from user handler", errUser)
    //        })
    //    }).catch(err=>{
    //        Response(res,false, "error from create handler", err)
    //    })

    try {
        var product = await Product.findById(req.query.productId)

        if (product) {
            var review = await Review.create({
                text: req.body.text,
                user: req.userId,
                product: req.query.productId
            })
            await User.findByIdAndUpdate(review.user, { $push: { reviews: review._id } }, { useFindAndModify: false })
            await Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } }, { useFindAndModify: false })

            Response(res, true, "review created", review)
        } else {
            Response(res, true, "product doesnt xist", review)

        }
    

    } catch (err) {
    Response(res, false, "error from create handler", err)

}

}

exports.reviewUpdate = async (req, res) => {
    try {
        var review = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        Response(res, true, "review updated", review)
    } catch (err) {
        Response(res, false, "error from handler", err)
    }

}

exports.reviewDelete = async (req, res) => {
    try {

        var review = await Review.findByIdAndRemove(req.params.id)
        await User.findByIdAndUpdate(req.userId, { $pull: { reviews:{$in: review._id }} })
        await Product.findByIdAndUpdate(review.product, { $pull: { reviews: {$in:review._id }} })
        Response(res, true, "Review deleted", review)
    } catch (err) {
        Response(res, false, "error from handler", err)
    }
}

exports.reviewShowAll = (req, res) => {
    Review.find({}).then(allreviews => {
        Response(res, true, "all reviews retrievs", allreviews)
    }).catch(err => {
        Response(res, false, "error from handler", err)
    })
}

exports.reviewShow = async (req, res) => {
    try {
        var review = await Review.findById(req.params.id)

        review ? Response(res, true, "Review", review) : Response(res, false, " review not found")
    } catch (err) {
        Response(res, false, "error from handler", err)

    }
}