import { KeyboardAvoidingView, Text, TextInput, View, ScrollView } from 'react-native';

import { useState } from 'react';

import Button from 'react-native-button';
import { set, ref } from 'firebase/database';
// import DogsContext from '../../contexts/DogsContext';
import { database } from '../../firebase';
import styles from './Styles';

function AddDogScreen() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [DoB, setDoB] = useState('');
  const [size, setSize] = useState('');
  const [bio, setBio] = useState('');
  const [postCode, setPostCode] = useState('');

  // Following Bryn's advice, checking whether an owner already has a dog with the same name,
  // before adding a new one, has been added as an Extra Feature Ticket (#28)
  const handleAddDog = (name, imageUrl, DoB, size, bio, postCode) => {
    // function addDogWithProps(name, imageUrl, DoB, size, bio, postCode) => {
    set(ref(database, 'data/dogs/' + `data/users/${res.user.uid}` + `dog${dogCounter++}`), {
      createdAt: Date.now(),
      name,
      imageUrl,
      dateOfBirth: DoB,
      size,
      dogBio: bio,
      postCode,
    })
      .then(() => {
        alert('Dog successfully added');
      })
      .catch((err) => alert(err.message));
  };
  // }

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
              // Still need to check this input is an URL
              onChangeText={(newText) => {
                setImageUrl(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={DoB}
              placeholder="Date of Birth"
              // Still need to get this input to only accept dates,
              // as onChangeText favours strings
              onChangeText={(newNumber) => {
                setDoB(newNumber);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={size}
              placeholder="Size"
              onChangeText={(newText) => {
                setSize(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={bio}
              placeholder="Tell me more about your dog..."
              onChangeText={(newText) => {
                setBio(newText);
              }}
            />

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
