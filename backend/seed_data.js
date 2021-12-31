const Customers = require('./models/customer');
const Products = require('./models/product');

function populateDatabase()
{
    // Populate the database with hard-coded information
    Customers.create({
        id: 1,
        name: "John Doe",
        country: "CA",
        state: "ON",
        city: "Toronto"
    });
    Customers.create({
        id: 2,
        name: "Jack Doe",
        country: "US",
        state: "CA",
        city: "La Jolla",
        zip: '92093'
    });
    Products.create({
        id: 1,
        name: "Chocolate",
        price: 3.99
    });
    Products.create({
        id: 2,
        name: "Soda",
        price: 1.99
    });
    Products.create({
        id: 3,
        name: "Pizza",
        price: 8.99
    });
    Products.create({
        id: 4,
        name: "Salad",
        price: 5.99
    });
}

module.exports = populateDatabase;