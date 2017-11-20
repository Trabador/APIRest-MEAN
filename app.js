'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

const api = require('./routes/router');
const configurator = require('./config')
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api',api);
app.use('/', express.static(path.join(__dirname + '/public/client')));


/*app.get('/Products/', (req,res) =>{
    res.sendFile('/client/index.html');
});*/

function run(){
    mongoose.connect(configurator.db,{useMongoClient: true}, (err,res) =>{
        if(err)
            throw err;
        console.log("Conexion a la base de datos "+configurator.db+" realizada");
        app.listen(configurator.port, () => {
            console.log("Server running on port "+configurator.port)
        });
    });
}

var run = {run};

module.exports = run;




