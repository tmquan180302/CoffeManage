const mongoose = require('mongoose');

// schema
const schema = mongoose.Schema;
const productSchema = new schema({

    id: {
        type: String,
        required: true,
    },
    idCategory: {
        type: Number,   
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },

})

// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
