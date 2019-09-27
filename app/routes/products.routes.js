var product = require('../controller/product.controller')
var Authentication = require('../middleware/Authentication')
var Authorization = require('../middleware/Authorization')


module.exports =(app)=>{
    app.post('/product', Authentication, product.productCreate )
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
    app.delete('/product/:id', Authentication, Authorization.product, product.productDelete)
    app.put('/product/:id', Authentication, Authorization.product, product.productUpdate )
}