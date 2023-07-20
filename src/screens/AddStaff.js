import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddStaff = () => {

  const {navigation, route} = useNavigation();
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    const data = {
      'id': id,
      'password': password,
      'role': role,
      'name': name,
      'phone': phone
    };
    
    const resetForm = () => {
      setId('');
      setPassword('');
      setRole('');
      setName('');
      setPhone('');
    };



    ///Thiếu sửa 


    // Phần này lấy IPV4 của máy '192.168.1.3' thay vào!!!!!!
    fetch('http://192.168.1.3:3000/api/addStaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
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
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={text => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Role (admin or staff)"
        value={role}
        onChangeText={text => setRole(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Button
        title="Thêm"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default AddStaff;
