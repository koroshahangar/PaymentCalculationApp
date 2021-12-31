const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    }

});
var Products = mongoose.model('Product', productSchema);

module.exports = Products;