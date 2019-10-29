require('dotenv').config()
var path = require('path')
var cors = require('cors')
var express = require('express')
var app = express()
var Product = require('./app/models/product.model')
var PORT = process.env.PORT || 3030
const bodyParser = require('body-parser')
const config_server = process.env.DB_ATLAS_MONGO || process.env.DB_LOCAL_MONGO



const mongoose = require('mongoose');
mongoose.connect(config_server, { useNewUrlParser: true, useUnifiedTopology: true });

//body parser
app.use(bodyParser.json())

//CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('hi')
})





//API
require('./app/routes/user.routes')(app)
require('./app/routes/products.routes')(app)
require('./app/routes/review.routes')(app)



app.listen(process.env.PORT, () => {
    console.log('Litening on port ' + PORT)
})

