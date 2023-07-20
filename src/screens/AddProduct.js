import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddProduct = () => {
    const [id, setId] = useState('');
    const [idCategory, setIdCategory] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState([
        { label: 'Cafe', value: 0 },
        { label: 'Hi-Tea Soda', value: 1 },
        { label: 'Cafe Cup', value: 2 },
        { label: 'Frosty', value: 3 },

    ]);
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        console.log('Form submitted:', { id, idCategory, name, price });
        const data = {
            'id': id,
            'idCategory': idCategory,
            'name': name,
            'price': price
        };

        const resetForm = () => {
            setId('');
            setIdCategory('');
            setName('');
            setPrice('');
          };

        fetch('http://192.168.1.3:3000/api/addProduct', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                resetForm();
                Alert.alert('Form submitted successfully');

            })
           
    };

    return (
        <View>
            <TextInput
                placeholder="ID"
                value={id}
                onChangeText={setId}
                style={styles.input}
            />


            <DropDownPicker
                open={open}
                items={items}
                value={idCategory}
                setOpen={setOpen}
                setValue={setIdCategory}
                setItems={setItems}
                placeholder="Select a category"

                theme="LIGHT"
            />



            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                keyboardType="numeric"
            />
            <Button title="Thêm sản phẩm " onPress={handleSubmit} />
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

export default AddProduct;
