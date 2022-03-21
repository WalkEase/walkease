import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { auth, database } from '../../firebase';

import Button from 'react-native-button';
import { set } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`${email}`, `${password}`);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return (
        
      <View style={styles.main_contain}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.header}>WalkEase</Text>
          
      <View style={styles.login_inputs_container}>
        <TextInput
          style={styles.login_input}
          defaultValue={email}
          placeholder="email"
          onChangeText={(newText) => {
            setEmail(newText);
          }}
        />
        <TextInput
          style={styles.login_input}
          defaultValue={password}
          placeholder="password"
          onChangeText={(newText) => {
            setPassword(newText);
          }}
                />
                </View>
                 <Button
        style={styles.login_button}
        accessibilityLabel="login-button"
        onPress={handleLogin}>
        Login
      </Button>
      

      <Text>If you dont have an account, sign up here</Text>
            </KeyboardAvoidingView>
            </View>
  );
};

export default LoginScreen;
