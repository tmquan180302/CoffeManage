import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Spacer from '../components/Spacer';
import TouchableButon from '../components/TouchableButton';
import axios from 'axios';
const Login = () => {
    const navigation = useNavigation();
    const [userNameTextInput, setUserNameTextInput] = useState('');
    const [passwordTextInput, setPasswordTextInput] = useState('');
    const onValidate = () => {
        if (userNameTextInput.trim() === '' && passwordTextInput.trim() === '') {
            Alert.alert('Missing Information', 'Please enter your email and password');
            return;
        }

        if (userNameTextInput.trim() === '') {
            Alert.alert('Missing Email', 'Please enter your email');
            return;
        }

        if (passwordTextInput.trim() === '') {
            Alert.alert('Missing Password', 'Please enter your password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userNameTextInput)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        
        if (!(userNameTextInput.trim() === 'nhom1@gmail.com')) {
            Alert.alert('Error Email', 'Please enter a valid email address');
            return;
        }

        if (!(passwordTextInput.trim() === '123')) {
            Alert.alert('Error Password', 'Please enter a valid password');
            return;
        }
        navigation.navigate('MainDrawer');

        // const data = {
        //    'id' : userNameTextInput,
        //    'password' : passwordTextInput,
        // };
        // fetch('http://192.168.1.3:3000/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => {
        //         console.log(response.data.id);
        //     })
                

    }
    const onLogin = () => onValidate();
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.header}>
                <Image style={Styles.banner} source={require('../../assets/banner.png')} />
                <Text style={Styles.title}>Sign In</Text>
            </View>

            <View style={Styles.textInputContainer}>
                <TextInput
                    style={Styles.textInput}
                    placeholder="UserName"
                    placeholderTextColor="#333"
                    value={userNameTextInput}
                    onChangeText={text => setUserNameTextInput(text)}
                />
                <Spacer height={20} />
                <TextInput
                    style={Styles.textInput}
                    placeholder="Passwords"
                    placeholderTextColor="#333"
                    value={passwordTextInput}
                    secureTextEntry={true}
                    onChangeText={text => setPasswordTextInput(text)}
                />
                <TouchableOpacity style={Styles.register} onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={Styles.textRegister}>Don't have an account? Register</Text>
                </TouchableOpacity>
                <Spacer height={50} />
                <TouchableButon title={'Login'} textStyle={{ color: 'white' }} buttonStyle={{ backgroundColor: '#8F5D08' }} onPress={() => onLogin()} />
            </View>
        </SafeAreaView>
    );
}

export default Login;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        height: '60%',
    },
    banner: {
        width: '100%',
        height: '55%',
    },
    title: {
        fontSize: 36,
        marginTop: 20,
        marginLeft: 20,
        color: '#8F5D08',
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: -100,
    },
    textInput: {
        width: '85%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 5,
        color: '#333',
    },
    register: {
        marginTop: 20,
    },
    textRegister: {
        fontSize: 14,
        color: '#333'
    }
});