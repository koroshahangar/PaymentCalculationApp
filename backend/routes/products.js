const express = require('express');
const Products = require('../models/product');

const productRouter = express.Router();

productRouter.route('/')
.get((req,res,next) => {
    Products.find({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => next(err));
});

module.exports = productRouter;