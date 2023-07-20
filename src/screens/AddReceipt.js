import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableHighlight, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../components/Spacer';

const AddReceipt = () => {
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [sale, setSale] = useState('');
    const [total, setTotal] = useState('');
    const [description, setDescription] = useState('');

    const [openCustomer, setOpenCustomer] = useState(false);
    const [openEmployee, setOpenEmployee] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);


    useEffect(() => {
        // Fetch customers, employees, and products data from the server
        fetchCustomers();
        fetchEmployees();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        // Fetch customers data from the server and update the customers state
        try {
            const response = await fetch('http://192.168.1.3:3000/api/getCustomer');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchEmployees = async () => {
        // Fetch employees data from the server and update the employees state
        try {
            const response = await fetch('http://192.168.1.3:3000/api/getStaff');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchProducts = async () => {
        // Fetch products data from the server and update the products state
        try {
            const response = await fetch('http://192.168.1.3:3000/api/getProduct');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    const handleTotle = () => {
        const selectedProductObj = products.find(
            (product) => product.name === selectedProduct
        );

        const price = selectedProductObj ? selectedProductObj.price : 0;
        const totalValue = (price * Number(quantity)) - (price * Number(quantity) * Number(sale) / 100);
        setTotal(totalValue);
    };
    const handleAddReceipt = () => {
        const data = {
            'selectedCustomer': selectedCustomer,
            'selectedEmployee': selectedEmployee,
            'selectedProduct': selectedProduct,
            'quantity': quantity,
            'sale': sale,
            'total': total,
            'description': description,
        };
        const resetForm = () => {
            setSelectedCustomer(null);
            setSelectedEmployee(null);
            setSelectedProduct(null);
            setQuantity('');
            setSale('');
            setTotal('');
            setDescription('');

          };
        fetch('http://192.168.1.3:3000/api/addReceipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Handle the response from the server
                // For example, you can display a success message or navigate to a new screen
                console.log('Form submitted successfully');
                Alert.alert('Form submitted successfully');
                resetForm();
            })
            .catch(error => {
                // Handle any errors that occurred during the form submission
                console.error('Error submitting form:', error);
            });
    };

    return (
        <View>
            <DropDownPicker
                open={openEmployee}
                items={employees.map((employee) => ({
                    label: employee.name,
                    value: employee.name,
                }))}
                value={selectedEmployee}
                defaultValue={selectedEmployee}
                onChangeItem={(item) => setSelectedEmployee(item.name)}
                setOpen={setOpenEmployee}
                setValue={setSelectedEmployee}
                maxHeight={50}
                placeholder="Select Employee"

                theme="LIGHT"
            />
            <Spacer height={50}></Spacer>


            <DropDownPicker
                open={openCustomer}
                items={customers.map((customer) => ({
                    label: customer.name,
                    value: customer.name,
                }))}
                value={selectedCustomer}
                defaultValue={selectedCustomer}
                onChangeItem={(item) => setSelectedCustomer(item.name)}
                maxHeight={50}
                setValue={setSelectedCustomer}
                placeholder="Select Customer"
                setOpen={setOpenCustomer}

                theme="LIGHT"
            />
            <Spacer height={50}></Spacer>


            <DropDownPicker
                open={openProduct}
                items={products.map((product) => ({
                    label: product.name,
                    value: product.name,
                }))}
                value={selectedProduct}
                defaultValue={selectedProduct}
                onChangeItem={(item) => setSelectedProduct(item.name)}
                setOpen={setOpenProduct}
                setValue={setSelectedProduct}
                maxHeight={50}
                placeholder="Select Product"
                theme="LIGHT"
            />
            <Spacer height={50}></Spacer>

            <TextInput
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                style={styles.input}
                placeholder='Quantity'
                keyboardType="numeric"
            />



            <TextInput
                value={sale}
                onChangeText={(text) => setSale(text)}
                style={styles.input}
                placeholder='Sale'
                keyboardType="numeric"
            />
            <TouchableHighlight onPress={handleTotle}>
                <TextInput
                    value={total}
                    onChangeText={(text) => setTotal(text)}
                    style={styles.input}
                    placeholder={`${total}`}
                    keyboardType="numeric"
                />
            </TouchableHighlight>




            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
                placeholder='Description'
                multiline
            />

            <Button title="Submit" onPress={handleAddReceipt} />
        </View>
    );
};

const styles = {
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
};

export default AddReceipt;
