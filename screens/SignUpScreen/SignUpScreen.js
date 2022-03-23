import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    View,
    Picker,
    ScrollView
} from 'react-native';

import React, { useState, useContext } from 'react';
import { auth, database } from '../../firebase';

import Button from 'react-native-button';
import { set, ref, get } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './styles';
import UserContext from '../../contexts/UserContext';


const SignUpScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType, setUserType] = useState("Owner");
    const [postCode, setPostCode] = useState("");
    const [DoB, setDoB] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [userBio, setUserBio] = useState('');


    const handleSignUp = () => {

        if (password === confirmPassword) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {

                    const dbRef = ref(database);
                    setUser(res.user.uid);

                    set(ref(database, `data/users/${res.user.uid}`), {
                        uid: res.user.uid,
                        createdAt: Date.now(),
                        email: `${email}`,
                        userType: userType,
                        firstName: firstName,
                        lastName: lastName,
                        postCode: postCode,
                        dateOfBirth: DoB,
                        avatarUrl: avatarUrl,
                        userBio: userBio
                    });
                    return res.user.uid;
                })
                .then((uid) => {
                    return get(ref(database, `data/users/${uid}`))
                })
                .then((user) => {
                    const userTypeIn = user.val().userType;
                    navigation.navigate(`${userTypeIn}LandingScreen`);
                })
                .catch(error => alert(error.message));
        } else {
            alert("Passwords must match");
        }
    };

    return (

        <View style={styles.main_contain}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding">

                    <View style={styles.login_inputs_container}>
                        <Text style={styles.header}>WalkEase</Text>

                        <TextInput
                            style={styles.login_input}
                            defaultValue={email}
                            placeholder="Email"
                            onChangeText={(newText) => {
                                setEmail(newText);
                            }}
                        />

                        <TextInput
                            style={styles.login_input}
                            defaultValue={password}
                            placeholder="Password"
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

                        <View style={styles.picker}>
                            <Picker
                                selectedValue={userType}
                                onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                            >
                                <Picker.Item label="Owner" value="Owner" />
                                <Picker.Item label="Walker" value="Walker" />

                            </Picker>

                        </View>

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

                        <TextInput
                            style={styles.login_input}
                            defaultValue={postCode}
                            placeholder="Post Code"
                            onChangeText={newText => {
                                setPostCode(newText);
                            }}
                        />

                        <TextInput
                            style={styles.login_input}
                            defaultValue={DoB}
                            placeholder="DD/MM/YYYY"
                            onChangeText={newText => {
                                setDoB(newText);
                            }}
                        />

                        <TextInput
                            style={styles.login_input}
                            defaultValue={avatarUrl}
                            placeholder="Web link to image"
                            onChangeText={newText => {
                                setAvatarUrl(newText);
                            }}
                        />

                        <TextInput
                            style={styles.login_input}
                            multiline={true}
                            defaultValue={userBio}
                            placeholder="Tell me about yourself"
                            onChangeText={newText => {
                                setUserBio(newText);
                            }}
                        />

                    </View>

                    <Button
                        style={styles.login_button}
                        accessibilityLabel="login-button"
                        onPress={handleSignUp}>
                        Sign Up
                    </Button>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default SignUpScreen;