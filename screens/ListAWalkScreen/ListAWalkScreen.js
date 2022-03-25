import { KeyboardAvoidingView, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { set, ref, onValue, push } from 'firebase/database';
import Button from 'react-native-button';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { config } from '../../.api';

function ListAWalkScreen({ navigation }) {
  const [walkDesc, setWalkDesc] = useState('');
  const [walkRequirements, setWalkRequirements] = useState('');
  const [walkMinutes, setWalkMinutes] = useState('');
  const [postCode, setPostCode] = useState('');
  const { user } = useContext(UserContext);
  const postCodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/gi;

  function HandleSubmit() {
    // checking if post code valid before sending to Api
    if (postCode.match(postCodeRegex) != null) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${config.MY_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ZERO_RESULTS') {
            alert('Please provide valid post Code API');
          } else {
            push(ref(database, `data/walks/${user.uid}`), {
              createdAt: Date.now(),
              walkDesc,
              walkRequirements,
              walkMinutes,
              postCode,
              coordinates: data.results[0].geometry.location,
            });
          }
        })
        .then(() => {
          navigation.navigate('MyListedWalksScreen');
        })
        .catch((error) => alert(error.message));
    } else {
      return alert('Please provide valid post Code regex');
    }
  }
  return (
    <View style={styles.main_contain}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <Text style={styles.header}>WalkEase</Text>

            <TextInput
              style={styles.login_input}
              defaultValue={walkDesc}
              placeholder="walkDesc"
              onChangeText={(newText) => {
                setWalkDesc(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={walkRequirements}
              placeholder="walkRequirements"
              onChangeText={(newText) => {
                setWalkRequirements(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={walkMinutes}
              placeholder="Walking minutes"
              onChangeText={(newText) => {
                setWalkMinutes(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={postCode}
              placeholder="postCode"
              onChangeText={(newText) => {
                setPostCode(newText);
              }}
            />
          </View>

          <Button
            style={styles.login_button}
            accessibilityLabel="login-button"
            onPress={HandleSubmit}
          >
            Submit
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default ListAWalkScreen;
