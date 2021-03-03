import React from 'react';
import {SafeAreaView, Text, TouchableHighlight, TextInput, Button} from 'react-native';

import axios from 'axios';


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            console.log(response)
        });
        axios.post('https://api.sanctum.test/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
        });
    }

    return (    
        <SafeAreaView>
          <Text>Screen: Login</Text>
      
          <TouchableHighlight onPress={() => navigation.navigate('Home')}>
            <Text>Home</Text>
          </TouchableHighlight>
        </SafeAreaView>
    );
}


export default LoginScreen;