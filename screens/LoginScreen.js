import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <Text>Login</Text>
            <View>
                <TextInput placeholder="email"/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
