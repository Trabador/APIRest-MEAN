'use strict'
var configurator = {
    port: process.env.PORT || 8080,
    db: process.env.MONGODB || 'mongodb://localhost/products'
};

module.exports = configurator;