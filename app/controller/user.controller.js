require('dotenv').config()
var User = require('../models/user.model')
const bcrypt = require('bcrypt');
var Response = require('../middleware/Response')
var jwt = require('jsonwebtoken');



exports.userCreate = (req, res) => {

    var newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALT)),
        email: req.body.email,
        image: req.body.image,
        reviews: [req.body.reviews],
        products: [req.body.products],
    })
    newUser.save()
        .then(createdUser => {
            Response(res, true, 'user created', createdUser, 201)
        }).catch(err => {
            Response(res, false, 'error from create handler', err, 500)
        })

}


exports.userShowAll = (req, res) => {

    User.find({})
        .then(alluser => {
            Response(res, true, 'all users retrieved', alluser)
        }).catch(err => {
            Response(res, false, 'error from userShowAll handler', err, 500)
        })
}

exports.userShow = (req, res) => {
    User.findById(req.params.id)
        .populate({
            path: 'products',
            select: ['name', 'price', 'image']
        })
        .then(user => {
            if (user) {
                Response(res, true, 'retrieved user', user)
            } else {
                Response(res, false, 'user not found', null, 404)
            }

        })
        .catch(err => {
            Response(res, false, 'error from userShow handler', 500)
        })
}

exports.userDelete = (req, res) => {
    User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(data => {

                Response(res, true, 'delete user', data, 200)

        }).catch(err => {
            Response(res, false, 'user not found', err, 500)
        })

}

exports.userUpdate = (req, res) => {
    var updateUser = req.body
    if (updateUser.password) {
        updateUser.password = bcrypt.hashSync(req.body.password, 10)
    }
    User.findByIdAndUpdate(req.params.id, {
        $set: updateUser
    }, {
            new: true,
            useFindAndModify: false
        })
        .then(updated => {
Response(res,true,'user updated', updated)
        })
        .catch(err => {
            Response(res,false,'error from update handler', err, 500)
        })
}

exports.userLogin = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            var hash = bcrypt.compareSync(req.body.password, user.password)
            if (hash) {
                var token = jwt.sign({
                    username: user.username,
                    id: user._id
                }, process.env.JWT_SECRET);

                Response(res, true, "your logged in", { token: token, userId: user._id })
            } else {
                Response(res, false, "wrong password", null, 400)
            }

        })
        .catch(err => {
            Response(res, false, "cannot log in", err, 500)
        })
}