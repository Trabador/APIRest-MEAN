'use strict'

const model = require('../models/product');

function showAllProducts(req,res){
    model.find({},(err, products) =>{
        if(err)
            res.status(500).send({message: `Error al intentar acceder a los productos: ERROR: ${err}` });
        else
            res.status(200).send({message: products}); 
    });
}

function showProductById(req,res){
    var id = req.params.productID;

    model.findById(id,(err, product) =>{
        if(err)
            res.status(500).send({message: `Error al intentar acceder al  producto. ERROR: ${err}` });
        else if (!product)
            res.status(404).send({message: `Producto ${id} no encontrado`});
        else
            res.status(200).send({message: product}); 
    });
}

function updateProductById(req,res){
    var newData = req.body;
    var id = req.params.productID;
    //returns the product post update
    var options = { new: true }; 
    model.findByIdAndUpdate(id, newData, options, (err, productUpdated) =>{
        if(err)
            res.status(500).send({message: `Error al intentar modificar el producto. ERROR: ${err}` });
        else
            res.status(200).send({message: productUpdated}); 
    });
}

function addNewProduct(req,res){
    var data = req.body;

    var product = new model(data);
    
    product.save((err,productStored) =>{
        if(err)
            res.status(500).send({message: `Error al intentar guardar el producto. ERROR: ${err}` });
        else
            res.status(200).send({message: productStored});
    });
}

function deleteProductById(req,res){
    var id = req.params.productID;

    model.findByIdAndRemove(id, (err,productRemoved) => {
        if(err)
            res.status(500).send({message: `Error al intentar borrar el producto. ERROR: ${err}`});
        else if(!productRemoved)
            res.status(404).send({message: `Error al intentar borrar el producto , no existe  el id ${id}`});
        else
            res.status(200).send({message: productRemoved});
    });
}


var productCtrls = {
    showAllProducts,
    showProductById,
    updateProductById,
    addNewProduct,
    deleteProductById
};

module.exports = productCtrls;
