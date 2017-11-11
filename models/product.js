'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: Number,
    category: {type: String, enum: ['computadoras','moviles','accesorios']},
    description: String
});

var model = mongoose.model("Product",productSchema);

module.exports = model;