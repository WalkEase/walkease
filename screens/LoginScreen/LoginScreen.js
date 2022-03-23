import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';

import Button from 'react-native-button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../../contexts/UserContext';
import { auth } from '../../firebase';
import styles from './styles';

function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`${email}`, `${password}`);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user.uid);
        navigation.navigate('OwnerLandingScreen');
      })
      .catch(console.log);
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
        <Button style={styles.login_button} accessibilityLabel="login-button" onPress={handleLogin}>
          Login
        </Button>

        <Text
          onPress={() => {
            navigation.navigate('Sign-up');
          }}
        >
          If you dont have an account, sign up here
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginScreen;
