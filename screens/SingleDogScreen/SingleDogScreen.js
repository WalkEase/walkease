import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Image, Picker } from 'react-native';
import { onValue, ref, set } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-native-button';
import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import styles from './styles';

const SingleDogScreen = ({ navigation, route }) => {

    // user & dog data
    const { user } = useContext(UserContext);
    const { dog, name, image, info } = route.params;

    // objects for holding original dog and changes
    const [dogToEdit, setDogToEdit] = useState({});
    const [changes, setChanges] = useState({});

    // name state 
    const [dogName, setDogName] = useState(name);
    const [dogNameValid, setDogNameValid] = useState(true);

    // URL state
    const [dogUrl, setDogUrl] = useState(image);
    const [dogUrlValid, setDogUrlValid] = useState(true);

    // size state
    const [dogSize, setDogSize] = useState(info[0]);

    // info state
    const [dogBio, setDogBio] = useState(info[1]);
    const [dogBioValid, setDogBioValid] = useState(true);

    // postCode state
    const [dogPostCode, setDogPostCode] = useState(info[2]);

    //date of birthstate
    const [dogDateOfBirth, setDogDateOfBirth] = useState(info[3]);
    const [dogDateOfBirthValid, setDogDateOfBirthValid] = useState(true);



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

        let validChanges = true;

        if (!/^[a-zA-Z]+$/.test(dogName)) {
            setDogNameValid(false);
            validChanges = false;
        }

        if (!/^.+[.].+[.].+[.](png|jpg)$/.test(dogUrl)) {
            setDogUrlValid(false);
            validChanges = false;
        }

        if (dogBio.length < 100 || dogBio.length > 200) {
            setDogBioValid(false);
            validChanges = false;
        }

        if (!/^[0-3]?[0-9][/](?:0[1-9]|1[012])[/](?:[0-9]{2})?[0-9]{2}$/.test(dogDateOfBirth)) {
            setDogDateOfBirthValid(false);
            validChanges = false;
        }


        if (!validChanges) return alert("Please check you've entered all information correctly");

        changes.dogBio = dogBio;
        changes.size = dogSize;
        changes.name = dogName;
        changes.imageUrl = dogUrl;
        changes.dateOfBirth = dogDateOfBirth;
        changes.postCode = dogPostCode;
        changes.createdAt = dogToEdit.createdAt;
        changes.dogId = dogToEdit.dogId;

        set(ref(database, `data/dogs/${user.uid}/${dog}`), changes).then((res) => {
            navigation.navigate('MyDogsScreen');
        }).then(() => {
            alert("Dog updated successfully");
        }).catch((err) => {
            alert(err.message);
        })
    }



    if (isLoading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );

    return (
        <>
            <ScrollView>
                <View style={styles.main_contain}>



                    <KeyboardAvoidingView style={styles.container} behavior="padding">

                        <View style={styles.login_inputs_container}>

                            <View>

                                <TextInput
                                    style={styles.login_input}
                                    defaultValue={dogName}
                                    placeholder="Change your dog name"
                                    onChangeText={(newText) => {
                                        setDogName(newText);
                                    }}
                                    onFocus={() => {
                                        setDogNameValid(true);
                                    }}
                                    onBlur={() => {
                                        setDogNameValid(/^[a-zA-Z]+$/.test(dogName));
                                    }}
                                />

                                {!dogNameValid ? (
                                    <Text style={styles.invalid_input}>
                                        * First Name must be UPPERCASE and lowercase letters only
                                    </Text>
                                ) : (
                                    false
                                )}
                            </View>

                            <View>
                                <Text style={styles.text}>Dog image</Text>
                                <Image source={{ uri: dogUrl }} alt="no image" style={styles.img} />
                                <TextInput
                                    style={styles.login_input}
                                    defaultValue={dogUrl}
                                    placeholder="Change your dog picture Url"
                                    onChangeText={(newText) => {
                                        setDogUrl(newText);
                                    }}
                                    onFocus={() => {
                                        setDogUrlValid(true);
                                    }}
                                    onBlur={() => {
                                        setDogUrlValid(/^.+[.].+[.].+[.](png|jpg)$/.test(dogUrl));
                                    }}
                                />

                                {!dogUrlValid ? (
                                    <Text style={styles.invalid_input}>* Invalid dog URL, must be PNG/JPG</Text>
                                ) : (
                                    false
                                )}
                            </View>

                            <View>
                                <TextInput
                                    style={styles.login_input}
                                    multiline
                                    defaultValue={dogBio}
                                    placeholder="Change your dog description"
                                    onChangeText={(newText) => {
                                        setDogBio(newText);
                                    }}

                                    onFocus={() => {
                                        setDogBioValid(true);
                                    }}
                                    onBlur={() => {
                                        if (dogBio.length < 100 || dogBio.length > 200) setDogBioValid(false);
                                    }}
                                />

                                <Text style={{ textAlign: 'right' }}>{dogBio.length} chars</Text>
                                {!dogBioValid ? (
                                    <Text style={styles.invalid_input}>
                                        {`Bio must be between 100 - 200 chars... Current length: ${dogBio.length} chars`}
                                    </Text>
                                ) : (
                                    false
                                )}
                            </View>

                            <View>


                                <TextInput
                                    style={styles.login_input}
                                    multiline
                                    defaultValue={dogDateOfBirth}
                                    placeholder="Change your dog date of birth"
                                    onChangeText={(newText) => {
                                        setDogDateOfBirth(newText);
                                    }}
                                    onFocus={() => {
                                        setDogDateOfBirthValid(true);
                                    }}
                                    onBlur={() => {
                                        setDogDateOfBirthValid(/^[0-3]?[0-9][/](?:0[1-9]|1[012])[/](?:[0-9]{2})?[0-9]{2}$/.test(dogDateOfBirth));
                                    }}
                                />

                                {!dogDateOfBirthValid ? (
                                    <Text style={styles.invalid_input}>* Invalid dog date of birth, must be dd/mm/yyyy</Text>
                                ) : (
                                    false
                                )}

                            </View>

                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={dogSize}
                                    onValueChange={(itemValue) => setDogSize(itemValue)}
                                >
                                    <Picker.Item label={"Currently " + dogSize} value={dogSize} />
                                    <Picker.Item label="Very Small" value="Very Small" />
                                    <Picker.Item label="Small" value="Small" />
                                    <Picker.Item label="Medium" value="Medium" />
                                    <Picker.Item label="Large" value="Large" />
                                    <Picker.Item label="Very Large" value="Very Large" />
                                </Picker>
                            </View>



                            <View>

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


                        <View style={styles.save_cancel}>
                            <View style={styles.save_press}>
                                <Text onPress={handleSubmitChanges} style={styles.cancel_save_text}>
                                    Save
                                </Text>
                            </View>
                            <View style={styles.cancel_press}>
                                <Text
                                    style={styles.cancel_save_text}
                                    onPress={() => {
                                        navigation.navigate('MyDogsScreen');
                                    }}
                                >
                                    Cancel
                                </Text>
                            </View>
                        </View>

                    </KeyboardAvoidingView>


                </View>
            </ScrollView>
            <Nav style={styles.nav_container} navigation={navigation} />
        </>
    )

}

export default SingleDogScreen;
