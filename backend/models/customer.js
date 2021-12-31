const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: () => this.country == 'US' || this.country == 'CA'
    },
    city: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: () => this.country == 'US'
    }

});
var Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;