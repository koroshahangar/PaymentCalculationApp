const express = require('express');
const Customers = require('../models/customer');

const customerRouter = express.Router();

customerRouter.route('/')
.get((req,res,next) => {
    Customers.find({})
    .then((customers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    })
    .catch((err) => next(err));
});

module.exports = customerRouter;