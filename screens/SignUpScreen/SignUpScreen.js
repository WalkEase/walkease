import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { auth, database } from '../../firebase';

import Button from 'react-native-button';
import { set } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './styles';

const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignUp = () => {

    };

    return (

        <View style={styles.main_contain}>


            <Text style={styles.header}>WalkEase</Text>
            <KeyboardAvoidingView style={styles.container} behavior="padding">


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
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.login_input}
                        defaultValue={confirmPassword}
                        placeholder="Confirm password"
                        onChangeText={(newText) => {
                            setConfirmPassword(newText);
                        }}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.login_input}
                        defaultValue={firstName}
                        placeholder="First Name"
                        onChangeText={(newText) => {
                            setFirstName(newText);
                        }}
                    />

                    <TextInput
                        style={styles.login_input}
                        defaultValue={lastName}
                        placeholder="Last Name"
                        onChangeText={(newText) => {
                            setLastName(newText);
                        }}
                    />

                    <Button
                        style={styles.login_button}
                        accessibilityLabel="login-button"
                        onPress={handleSignUp}>
                        Sign Up
                    </Button>

                </View>





            </KeyboardAvoidingView>

        </View>
    );
};

export default SignUpScreen;