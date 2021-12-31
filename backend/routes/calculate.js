// Sample POST request body:

// {
//     "customer_id": 1,
//     "items": [
//       {
//         "item_id": 1,
//         "quantity": 2      
//       },
//       {
//         "item_id": 2,
//         "quantity": 0      
//       },
//       {
//         "item_id": 3,
//         "quantity": 0
//       },
//       {
//         "item_id": 4,
//         "quantity": 1
//       }
//     ]
//   }
  

const express = require('express');
const bodyParser = require('body-parser');
const Products = require('../models/product');
const Customers = require('../models/customer');
const Taxjar = require('taxjar');

// Setting up TaxJar client
const taxJarApiKey = process.env.TAX_JAR_API_KEY || '9e0cd62a22f451701f29c3bde214';
const taxJarClient = new Taxjar({
    apiKey: taxJarApiKey
});

const calculateRouter = express.Router();

function respondWithError(res, message) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        error: message
    });
}
calculateRouter.use(bodyParser.json());
calculateRouter.route('/')
.post((req,res,next) => {      
    let foundInvalidItem = false;
    if (req.body.items != undefined)
    {
        req.body.items.forEach((item) => {
            if(item.item_id == undefined || item.quantity == undefined)
            {
                foundInvalidItem = true;
            }
        });
    }
    
    if (req.body.customer_id == undefined )
    {
        respondWithError(res, "customer_id should be set");
    }
    else if (req.body.items == undefined)
    {
        respondWithError(res, "items should be set");
    }
    else if (foundInvalidItem) {
        respondWithError(res, "item_id and quantity must be set for each item");
    }
    else {
        let apiResponse = {};
        // Of course, this could be optimized for performance such that we do not make a query for each item
        // For simplicity's sake, I am leaving it like this for now
        Customers.findOne({id: req.body.customer_id})
        .then((customer) => {
            apiResponse.customer_name = customer.name;
            return customer;
        })
        .catch((err) => {
            throw new Error("customer not found!");
        })
        .then((customer) => {
            return taxJarClient.ratesForLocation(customer.zip, {
                city: customer.city,
                state: customer.state,
                country: customer.country
            });
            
            // The following return object was used to simulate the actual API response
            
            // return {
            //     rate: {
            //         combined_rate: "0.0975"
            //     }
            // };
        })
        .catch((err) => {
            if (err.message == "customer not found!")
                throw new Error("customer not found!");
            else
                throw new Error("Failed to fetch local tax rate from TaxJar. Please make sure your API key is valid.");    
        })
        .then((taxInfo) => {
            Products.find({})
            .then((products) => {
                let combined_tax_rate = parseFloat(taxInfo.rate.combined_rate);
                let subtotal = 0;
                let tax = 0;
                apiResponse.combined_tax_rate = combined_tax_rate;
                apiResponse.items = req.body.items.filter(item => item.quantity > 0).map((item) => {
                    let product = products.filter(prod => prod.id == item.item_id)[0];
                    let price = product.price * item.quantity;
                    let item_tax =  price * combined_tax_rate;
                    subtotal += price;
                    tax += item_tax
                    return {
                        item_id: product.id,
                        quantity: item.quantity,
                        price: price,
                        tax: item_tax,
                        total: price + item_tax,
                        name: product.name
                    };
                });
                apiResponse.subtotal = subtotal;
                apiResponse.tax = tax;
                apiResponse.total = subtotal + tax;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apiResponse);
                return; 
            })
            .catch(() => {
                respondWithError(res, "failed to fetch the products info!");
                return;
            });
        })        
        .catch((err) => {
            if(err.message != undefined)
            {
                respondWithError(res, err.message);
                return;
            }
            else 
                (err) => next(err);
        });
    }
});

module.exports = calculateRouter;