const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const customerRouter = require('./routes/customers');
const productRouter = require('./routes/products');
const calculateRouter = require('./routes/calculate');

const PopulateDatabase = require('./seed_data');

// Connect to the database
const url = 'mongodb://db:27017/';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// Use seed data to insert some starter info into db
PopulateDatabase();

// Setting up the application
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001"
    ]
}));


const router = express.Router();
router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({
        message: "Backend is working",
    });
});
app.use('/', router);
app.use('/customers', customerRouter);
app.use('/products', productRouter);
app.use('/calculate', calculateRouter);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});