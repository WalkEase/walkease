import { KeyboardAvoidingView, Text, TextInput, View, LogBox } from 'react-native';
import React, { useContext, useState } from 'react';

import Button from 'react-native-button';
import { ref, get, onValue } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserContext from '../../contexts/UserContext';
import { auth, database } from '../../firebase';
import styles from './styles';

LogBox.ignoreAllLogs();

function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!/^.+@.+.[.].+$/.test(email)) return alert('Invalid email format');

    if (password === '') return alert('Please enter a valid password');

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        onValue(ref(database, `data/users/${res.user.uid}`), (dbUser) => {
          setUser(dbUser.val());
        });

        return get(ref(database, `data/users/${res.user.uid}`));
      })
      .then((res) => {
        navigation.navigate(`${res.val().userType}LandingScreen`);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <View style={styles.main_contain}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <TextInput
              autoCapitalize="none"
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
              secureTextEntry
            />
          </View>
          <View style={styles.buttons}>
            <Text
              style={styles.login_button}
              accessibilityLabel="login-button"
              onPress={handleLogin}
            >
              Login
            </Text>
            <Text
              style={styles.login_button}
              accessibilityLabel="login-button"
              onPress={() => {
                navigation.navigate('Sign-up');
              }}
            >
              Sign Up
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.nav_container} />
    </>
  );
}

export default LoginScreen;
