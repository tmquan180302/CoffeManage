const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('../../models/Employee ');
const Product = require('../../models/Product');
const Customer = require('../../models/Customer');
const Receipt = require('../../models/Receipt');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



router.post('/login',  (req, res) => {
    const {id , password} = req.body;
    try {
    Employee.findOne({id: id , password: password})
    .then((result) => res.json(result));
    } catch (err){
        res.status(422).send(err.message);
    }
   

});

router.post('/addStaff', (req, res) => {
    const { id, password, role, name, phone } = req.body;
    console.log(req.body);

    try {
        const employee = new Employee({ id: id, password: password, role: role, name: name, phone: phone });
        employee.save().then((result) => res.json(result));
    } catch (err) {
        res.status(422).send(err.message);
    }

});

router.get('/getStaff', async (req, res) => {
    await Employee.find({})
        .then(result => {
            console.log(result);
            res.json(result);
        })
});

router.get('/:id/deleteStaff', (req, res) => {
    Employee.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.json(result)
        })
})

router.post('/addProduct', (req, res) => {
    const { id, idCategory, name, price } = req.body;
    try {
        const product = new Product({ id: id, idCategory: idCategory, name: name, price: price });
        product.save().then((result) => res.json(result));
    } catch (err) {
        res.status(422).send(err.message);
    }

});

router.get('/getProduct', async (req, res) => {
    await Product.find({})
        .then(result => {
            console.log(result);
            res.json(result);
        })
});

router.get('/:id/deleteProduct', (req, res) => {
    Product.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.json(result)
        })
})

router.post('/addCustomer', (req, res) => {
    const { id, name, phone, adress } = req.body;
    console.log(req.body);

    try {
        const customer = new Customer({ id: id, name: name, phone: phone, adress: adress });
        customer.save().then((result) => res.json(result));
    } catch (err) {
        res.status(422).send(err.message);
    }

});

router.get('/getCustomer', async (req, res) => {
    await Customer.find({})
        .then(result => {
            console.log(result);
            res.json(result);
        })
});

router.get('/:id/deleteCustomer', (req, res) => {
    Customer.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.json(result)
        })
})

router.post('/addReceipt', (req, res) => {
    const { selectedCustomer, selectedEmployee, selectedProduct, quantity, sale, total, description } = req.body;
    try {
        const receipt = new Receipt({
            selectedCustomer: selectedCustomer, selectedEmployee: selectedEmployee, selectedProduct: selectedProduct
            , quantity: quantity, sale: sale, total: total, description: description
        });
        receipt.save().then((result) => res.json(result));
    } catch (err) {
        res.status(422).send(err.message);
    }

});

router.get('/getReceipt', async (req, res) => {
    await Receipt.find({})
        .then(result => {
            console.log(result);
            res.json(result);
        })
});

router.get('/:id/deleteReceipt', (req, res) => {
    Receipt.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.json(result)
        })
})
module.exports = router;