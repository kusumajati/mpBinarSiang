require('dotenv').config()
var cors = require('cors')
var express = require('express')
var app = express()
var PORT = process.env.PORT || 3030
const bodyParser = require('body-parser')
const config_server = process.env.DB_ATLAS_MONGO || process.env.DB_LOCAL_MONGO



const mongoose = require('mongoose');
mongoose.connect(config_server, {useNewUrlParser: true, useUnifiedTopology: true});

//CORS
app.use(cors())

app.get('/',(req, res)=>{
    res.send('this is mp-binar-app')


   
})

app.post('/request', (req,res)=>{
    res.send({
        query: req.query.apaaja
    })
})

app.use(bodyParser.json())

//API
require('./app/routes/user.routes')(app)
require('./app/routes/products.routes')(app)
require('./app/routes/review.routes')(app)

app.listen(PORT, ()=>{
    console.log('Litening on port '+PORT)
})

