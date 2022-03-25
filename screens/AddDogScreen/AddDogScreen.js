import { KeyboardAvoidingView, Text, TextInput, View, ScrollView } from 'react-native';

import React, { useState, useContext, useEffect } from 'react';

import Button from 'react-native-button';
import { set, ref, onValue } from 'firebase/database';
import dogContext from '../../contexts/DogsContext';
import { database } from '../../firebase';
import styles from './styles';

function AddDogScreen() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [bio, setBio] = useState('');
  const [postCode, setPostCode] = useState('');  

    console.log(database);   

    const handleAddDog = () => {
    // If ( dog does not currently exist on owner's 'My Dogs' page ) {
        // console.log(database);
        if ()
        createDogWithName(name)
            .then((res) => {
                console.log(res)
            })
    }
        //then 
        .then((res) => {
          console.log(res.user);
          set(ref(database, `data/users/${res.user.uid}`), {
            uid: res.user.uid,
            createdAt: Date.now(),
            email: `${email}`,
            userType,
            firstName,
            lastName,
            postCode,
            dateOfBirth: DoB,
            avatarURL,
          });
        })
        .then((res) => {})
        .catch((error) => alert(error.message));
    } else {
      alert('Passwords must match');
    }
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
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default AddDogScreen;
