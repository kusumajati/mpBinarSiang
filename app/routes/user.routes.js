var user = require('../controller/user.controller')
var CheckUser = require('../middleware/CheckUser')
var Authentication = require('../middleware/Authentication')
var Authorization = require('../middleware/Authorization')

module.exports = (app) =>{
    app.post('/user', CheckUser.create, user.userCreate)
    app.get('/user', user.userShowAll)
    app.get('/user/:id', user.userShow)
    app.put('/user/:id', Authentication,Authorization.user, CheckUser.update, user.userUpdate)
    app.delete('/user/:id', user.userDelete)
    app.post('/user/login', user.userLogin)
    
}