import React, { useState } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { set } from 'firebase/database'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            
            <View style={styles.inputs}>
                <TextInput defaultValue={email}placeholder="email" onChangeText={(newText)=>{setEmail(newText)}} />
                <TextInput defaultValue={password} secureTextEntry placeholder="password" onChangeText={(newText) => { setPassword(newText) }} />
                {console.log(email, password)}
            </View>
            
            <Button title="Login" color="white" accessibilityLabel="login-button" onPress={() => {}}/>
            
                <Text>If you dont have an account, sign up here</Text>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#718355"
    },
    inputs: {
        backgroundColor: "white",
        width: "60%",
        padding: 5,
        borderRadius: 5
    }
})
