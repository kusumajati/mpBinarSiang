var review = require('../controller/review.controller')
var Authentication = require('../middleware/Authentication')
var Authorization = require('../middleware/Authorization')

module.exports =(app)=>{
    app.post('/review/', Authentication, review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
    app.put('/review/:id',Authentication, Authorization.review, review.reviewUpdate )
    app.delete('/review/:id', Authentication, Authorization.review, review.reviewDelete)

}