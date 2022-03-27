import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker } from 'react-native';
import { useState, useContext } from 'react';
import Button from 'react-native-button';
import { set, ref, push } from 'firebase/database';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './Styles';

function AddDogScreen() {


  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [DoB, setDoB] = useState('');
  const [size, setSize] = useState('Medium');

  // Dog Bio states
  const [bio, setBio] = useState('');
  const [bioValid, setBioValid] = useState(true);


  const [postCode, setPostCode] = useState(user.postCode);


  const handleAddDog = () => {

    let validDogAdd = true;

    if (bio.length < 100 || bio.length > 200) {
      setBioValid(false);
      validDogAdd = false;
    }

    if (!validDogAdd) return alert("Please check you've entered all information correctly");

    push(ref(database, `data/dogs/${user.uid}`), {

      createdAt: Date.now(),
      name,
      imageUrl,
      dateOfBirth: DoB,
      size,
      dogBio: bio,
      postCode,

    }).then((res) => {
      console.log(res);
      alert("Dog added successfully");
    }).catch((err) => {
      alert(err.message);
    })


  };


  return (
    <View style={styles.main_contain}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <Text style={styles.header}>Add a dog</Text>

            <TextInput
              style={styles.login_input}
              defaultValue={name}
              placeholder="Name"
              onChangeText={(newText) => {
                setName(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={imageUrl}
              placeholder="Add Image URL here..."
              onChangeText={(newText) => {
                setImageUrl(newText);
              }}
            />

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
