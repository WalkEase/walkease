import React, { useState } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { set } from 'firebase/database'
import { auth, database } from '../../firebase'
import styles from "./styles";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        console.log(`${email}`, `${password}`)
        signInWithEmailAndPassword(auth, email, password).then((res) => {
    console.log(res)
        }).catch((err) => {
    console.log(err)
})
    }

    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>
            
            <View style={styles.login_inputs_container}>
                <TextInput style={styles.login_input} defaultValue={email} placeholder='email' onChangeText={(newText)=>{setEmail(newText)}} />
                <TextInput style={styles.login_input} defaultValue={password}  placeholder='password' onChangeText={(newText) => { setPassword(newText) }} />
                
            </View>
            
            <Button title='Login' color='white' accessibilityLabel='login-button' onPress={handleLogin}/>
            
                <Text>If you dont have an account, sign up here</Text>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


