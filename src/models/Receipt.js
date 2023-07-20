const mongoose = require('mongoose');
const currentDate = new Date(Date.now());

// schema
const schema = mongoose.Schema;
const receiptSchema = new schema({

    selectedCustomer: {
        type: String,
        required: true,
    },
    selectedEmployee: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: `${currentDate.getHours()}:${currentDate.getMinutes()} : ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    },
    selectedProduct: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    sale: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    }



})

// Model
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
