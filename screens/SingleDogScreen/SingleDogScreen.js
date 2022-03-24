import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect } from 'react';

import Button from 'react-native-button';

import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import styles from './styles';

const SingleDogScreen = ({ navigation, route }) => {

    const { user } = useContext(UserContext);
    const { name, image, info } = route.params;

    const [dogToEdit, setDogToEdit] = useState({});
    const [changes, setChanges] = useState({});

    const [dogName, setDogName] = useState(name);
    const [dogUrl, setDogUrl] = useState(image);
    const [dogSize, setDogSize] = useState(info[0]);
    const [dogBio, setDogBio] = useState(info[1]);
    const [dogPostCode, setDogPostCode] = useState(info[2]);


    const [dogAge, setDogAge] = useState("");


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onValue(ref(database, `data/dogs/${user.uid}/${name}`), (res) => {
            setDogToEdit(res.val());
            setChanges(dogToEdit);

            setIsLoading(false);
        });
    }, []);

    console.log(info, "info")

    console.log(name, "name");
    console.log(dogToEdit, "dog to edit");
    console.log(changes, "changes");

    const handleSubmitChanges = () => {
        changes.dogBio = dogBio;
        changes.size = dogSize;
        changes.name = dogName;

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

                        <View>
                            <Text style={styles.header}>{dogName} </Text>
                            <TextInput
                                style={styles.login_input}
                                defaultValue={dogName}
                                placeholder="Change your dog name"
                                onChangeText={(newText) => {
                                    setDogName(newText);
                                }}
                            />
                        </View>

                        <View>
                            <Text style={styles.header}>Dog image</Text>
                            <Image source={{ uri: dogUrl }} alt="no image" style={styles.img} />
                            <TextInput
                                style={styles.login_input}
                                defaultValue={dogUrl}
                                placeholder="Change your dog picture Url"
                                onChangeText={(newText) => {
                                    setDogUrl(newText);
                                }}
                            />
                        </View>

                        <View>
                            <Text style={styles.header}>Description</Text>
                            <Text style={styles.text}>{dogBio}</Text>
                            <TextInput
                                style={styles.login_input}
                                multiline
                                defaultValue={dogBio}
                                placeholder="Change your dog description"
                                onChangeText={(newText) => {
                                    setDogBio(newText);
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.header}>Size: {dogSize} </Text>
                            <TextInput
                                style={styles.login_input}
                                defaultValue={dogSize}
                                placeholder="Change your dog size"
                                onChangeText={(newText) => {
                                    setDogSize(newText);
                                }}
                            />

                        </View>

                        <View>
                            <Text style={styles.header}>PostCode: {dogPostCode} </Text>
                            <TextInput
                                style={styles.login_input}
                                defaultValue={dogPostCode}
                                placeholder="Change your dog size"
                                onChangeText={(newText) => {
                                    setDogPostCode(newText);
                                }}
                            />

                        </View>




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
