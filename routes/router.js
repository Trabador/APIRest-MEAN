'use strict'
const express = require('express');
const api = express.Router();
const productCtrls = require('../controllers/productCtrls');

api.get('/Product',productCtrls.showAllProducts);

api.get('/Product/:productID',productCtrls.showProductById);

api.post('/Product',productCtrls.addNewProduct);

api.put('/Product/:productID',productCtrls.updateProductById);

api.delete('/Product/:productID',productCtrls.deleteProductById);

module.exports = api;