const mongoose = require('mongoose');
const currentDate = new Date(Date.now());

// schema
const schema = mongoose.Schema;
const customerSchema = new schema({

    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    adress: {
        type: String,
    },
    dateOfBirth: {
        type: String,
        default: ` ${currentDate.getHours()}:${currentDate.getMinutes()} : ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`

    }
})

// Model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
