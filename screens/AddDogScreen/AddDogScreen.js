import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker, Image } from 'react-native';
import { useState, useContext } from 'react';
import Button from 'react-native-button';
import { set, ref, push, update } from 'firebase/database';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './Styles';

function AddDogScreen() {


  const { user } = useContext(UserContext);

  const [DoB, setDoB] = useState('');
  const [size, setSize] = useState('Medium');

  // name state 
  const [dogName, setDogName] = useState("");
  const [dogImage, setDogImage] = useState(false);
  const [dogNameValid, setDogNameValid] = useState(true);

  // URL state
  const [dogUrl, setDogUrl] = useState("");
  const [dogUrlValid, setDogUrlValid] = useState(true);

  // Dog Bio states
  const [bio, setBio] = useState('');
  const [bioValid, setBioValid] = useState(true);


  const [postCode, setPostCode] = useState(user.postCode);


  const handleAddDog = () => {

    let validDogAdd = true;

    if (!/^[a-zA-Z]+$/.test(dogName)) {
      setDogNameValid(false);
      validDogAdd = false;
    }

    if (bio.length < 100 || bio.length > 200) {
      setBioValid(false);
      validDogAdd = false;
    }

    if (!/^.+[.].+[.].+[.](png|jpg)$/.test(dogUrl)) {
      setDogUrlValid(false);
      validDogAdd = false;
    }

    if (!validDogAdd) return alert("Please check you've entered all information correctly");

    const updateDog = push(ref(database, `data/dogs/${user.uid}`), {

      createdAt: Date.now(),
      name: dogName,
      imageUrl: dogUrl,
      dateOfBirth: DoB,
      size,
      dogBio: bio,
      postCode,

    });

    update(ref(database, `data/dogs/${user.uid}/${updateDog.key}`), {
      dogId: updateDog.key
    })
      .then(() => {
        alert("Dog added successfully");
      })
      .catch((err) => {
        alert(err.message);
      })


  };


  return (
    <View style={styles.main_contain}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <Text style={styles.header}>Add a dog</Text>

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
              {!dogImage ? (
                <View>
                  <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" }} style={styles.img} resizeMode="contain" />
                  <Text style={styles.text}>Add your dog image url below </Text>
                </View>
              ) : (
                <Image source={{ uri: dogUrl }} style={styles.img} />
              )}


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
                  setDogImage(true);
                }}
              />

              {!dogUrlValid ? (
                <Text style={styles.invalid_input}>* Invalid dog URL, must be PNG/JPG</Text>
              ) : (
                false
              )}
            </View>

            <TextInput
              style={styles.login_input}
              defaultValue={DoB}
              placeholder="Date of Birth"
              onChangeText={(newNumber) => {
                setDoB(newNumber);
              }}
            />

            <View style={styles.picker}>
              <Picker
                selectedValue={size}
                onValueChange={(itemValue) => setSize(itemValue)}
              >
                <Picker.Item label="Very Small" value="Very Small" />
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
                <Picker.Item label="Very Large" value="Very Large" />
              </Picker>
            </View>

            <TextInput
              style={styles.login_input}
              multiline
              defaultValue={bio}
              placeholder="Tell me more about your dog..."
              onChangeText={(newText) => {
                setBio(newText);
              }}
              onFocus={() => {
                setBioValid(true);
              }}
              onBlur={() => {
                if (bio.length < 100 || bio.length > 200) setBioValid(false);
              }}
            />
            <Text>{bio.length} chars</Text>

            {!bioValid ? (
              <Text style={styles.invalid_input}>
                {`Dog info must be between 100 - 200 chars... Current length: ${bio.length} chars`}
              </Text>
            ) : (
              false
            )}

            <TextInput
              style={styles.login_input}
              defaultValue={postCode}
              placeholder="Post Code"
              onChangeText={(newText) => {
                setPostCode(newText);
              }}
            />

            <Button
              style={styles.login_button}
              accessibilityLabel="add-a-dog-button"
              onPress={handleAddDog}
            >
              Add Dog
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default AddDogScreen;
