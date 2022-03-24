import { Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect } from 'react';

import Button from 'react-native-button';

import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import styles from './styles';

const SingleDogScreen = ({ navigation, route }) => {

    const { user } = useContext(UserContext);
    const { name } = route.params;

    const [dogToEdit, setDogToEdit] = useState({});
    const [changes, setChanges] = useState({});
    const [dogBio, setDogBio] = useState();
    const [dogSize, setDogSize] = useState();


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onValue(ref(database, `data/dogs/${user}/${name}`), (res) => {
            setDogToEdit(res.val());
            setChanges(dogToEdit);
            setIsLoading(false);
        });
    }, []);


    console.log(name, "name");
    console.log(dogToEdit, "dog now");
    console.log(changes, "changes");

    const handleSubmitChanges = () => {
        changes.dogBio = dogBio;
        changes.size = dogSize;
        console.log(changes, "after submit");
        alert("Still in building proccess");
    }

    if (isLoading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );

    return (
        <View style={styles.main_contain}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding">

                    <View style={styles.login_inputs_container}>
                        <Text style={styles.header}>Your Lovely Dog</Text>
                        <Text style={styles.header}> {name} </Text>


                        <TextInput
                            style={styles.login_input}
                            defaultValue={dogBio}
                            placeholder="dog description"
                            onChangeText={(newText) => {
                                setDogBio(newText);
                            }}
                        />

                        <TextInput
                            style={styles.login_input}
                            defaultValue={dogSize}
                            placeholder="dog size"
                            onChangeText={(newText) => {
                                setDogSize(newText);
                            }}
                        />
                    </View>

                    <Button
                        style={styles.login_button}
                        accessibilityLabel="login-button"
                        onPress={handleSubmitChanges}>
                        Submit changes
                    </Button>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )

}

export default SingleDogScreen;
