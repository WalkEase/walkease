import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { onValue, ref, set } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-native-button';
import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import styles from './styles';

const SingleDogScreen = ({ navigation, route }) => {

    const { user } = useContext(UserContext);
    const { dog, name, image, info } = route.params;

    const [dogToEdit, setDogToEdit] = useState({});
    const [changes, setChanges] = useState({});

    const [dogName, setDogName] = useState(name);
    const [dogUrl, setDogUrl] = useState(image);
    const [dogSize, setDogSize] = useState(info[0]);
    const [dogBio, setDogBio] = useState(info[1]);
    const [dogPostCode, setDogPostCode] = useState(info[2]);
    const [dogDateOfBirth, setDogDateOfBirth] = useState(info[3]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onValue(ref(database, `data/dogs/${user.uid}/${dog}`), (res) => {
            setDogToEdit(res.val());
            setChanges(dogToEdit);
            setIsLoading(false);
        });
    }, []);

    console.log(user.uid, "user");
    console.log(name, "name");
    console.log(dog, "id");
    console.log(dogToEdit, "dog to edit");
    console.log(changes, "changes 1");

    const handleSubmitChanges = () => {


        changes.dogBio = dogBio;
        changes.size = dogSize;
        changes.name = dogName;
        changes.imageUrl = dogUrl;
        changes.dateOfBirth = dogDateOfBirth;
        changes.postCode = dogPostCode;
        changes.createdAt = dogToEdit.createdAt;

        set(ref(database, `data/dogs/${user.uid}/${dog}`), changes).then((res) => {
            navigation.navigate('MyDogsScreen');
        })
    }

    const handleCancel = () => {
        navigation.navigate('MyDogsScreen');
    }

    if (isLoading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );

    return (
        <View style={styles.main_contain}>
            <Header />
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
                            <Text style={styles.header}>Date of Birth</Text>
                            <Text style={styles.text}>{dogDateOfBirth}</Text>
                            <TextInput
                                style={styles.login_input}
                                multiline
                                defaultValue={dogDateOfBirth}
                                placeholder="Change your dog description"
                                onChangeText={(newText) => {
                                    setDogDateOfBirth(newText);
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

                    <Button
                        style={styles.login_button}
                        accessibilityLabel="login-button"
                        onPress={handleCancel}>
                        Cancel
                    </Button>



                </KeyboardAvoidingView>

            </ScrollView>
            <Nav navigation={navigation} />

        </View>
    )

}

export default SingleDogScreen;
