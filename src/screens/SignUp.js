import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Spacer from "../components/Spacer";
import TouchableButon from "../components/TouchableButton";

const SignUp = () => {
    const navigation = useNavigation();
    const [userNameTextInput, setUserNameTextInput] = useState('');
    const [passwordTextInput, setPasswordTextInput] = useState('');
    const [confirmPasswordTextInput, setConfirmPasswordTextInput] = useState('');

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
        if (confirmPasswordTextInput.trim() === '') {
            Alert.alert('Missing Password', 'Please enter confirm your password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userNameTextInput)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        if (passwordTextInput !== confirmPasswordTextInput) {
            Alert.alert('Error Password', 'Please confirm your password');
            return;
        }

        onSignUp();
    }
    const onSignUp = () => Alert.alert('SignUp Successful', 'Your username is register, please press SignUp');

    return (
        <View style={Styles.container}>
            <Spacer height={20}/>
            <Image style={Styles.banner} source={require('../../assets/banner.png')} />
            <Spacer height={10} />
            <Text style={Styles.title}>Sign Up</Text>
            <Spacer height={30} />
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
                <Spacer height={20} />
                <TextInput
                    style={Styles.textInput}
                    placeholder="Confirm Passwords"
                    placeholderTextColor="#333"
                    value={confirmPasswordTextInput}
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPasswordTextInput(text)}
                />
                <TouchableOpacity style={Styles.signIn} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={Styles.textSignIn}>Already have an account? SignIn</Text>
                </TouchableOpacity>
                <Spacer height={50} />
                <TouchableButon title={'Sign Up'} textStyle={{ color: 'white' }} buttonStyle={{ backgroundColor: '#8F5D08' }} onPress={() => onValidate()} />
            </View>
        </View>
    );
}

export default SignUp;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    banner: {
        height:  '30%',
        width: '100%',
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
    signIn: {
        marginTop: 20,
    },
    textSignIn: {
        fontSize: 14,
        color: '#333'
    },
});