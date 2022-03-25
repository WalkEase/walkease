import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { set, ref, onValue, push, update, ServerValue, firebase, postRef } from 'firebase/database';
import Button from 'react-native-button';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { config } from '../../.api';

function ListAWalkScreen({ navigation }) {
  const [walkDesc, setWalkDesc] = useState('');
  const [walkRequirements, setWalkRequirements] = useState('');
  const [walkMinutes, setWalkMinutes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [postCode, setPostCode] = useState('');
  const { user } = useContext(UserContext);
  const [dogObject, setDogsObject] = useState('');
  const [pickDog, setPickDog] = useState('');
  const [dogData, setDogData] = useState('');
  const [dateTime, setDateTime] = useState('');

  const postCodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/gi;

  useEffect(() => {
    console.log('useEffect');
    onValue(
      ref(database, `data/dogs/${user.uid}`),
      (res) => {
        setDogsObject(res.val());
        setIsLoading(false);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);
  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const dogsIdsArray = Object.keys(dogObject);

  const dogDataArray = [];
  dogsIdsArray.map((dog) => dogDataArray.push(dogObject[dog]));

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
            const test = push(ref(database, `data/walks/${user.uid}`), {
              createdAt: Date.now(),
              dogId: dogData.dogId,
              dogName: dogData.name,
              walkDesc,
              walkRequirements,
              walkMinutes,
              'date and time': dateTime,
              postCode,
              coordinates: data.results[0].geometry.location,
            });
            update(ref(database, `data/walks/${user.uid}/${test.key}`), {
              walkId: test.key,
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
  console.log(dogData);
  return (
    <View style={styles.main_contain}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <Text style={styles.header}>WalkEase</Text>

            <TextInput
              style={styles.login_input}
              defaultValue={walkDesc}
              placeholder="Walk Description"
              onChangeText={(newText) => {
                setWalkDesc(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={walkRequirements}
              placeholder="Walk Requirements"
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
              placeholder="Post Code"
              onChangeText={(newText) => {
                setPostCode(newText);
              }}
            />
            <TextInput
              style={styles.login_input}
              defaultValue={dateTime}
              placeholder="Date and time"
              onChangeText={(newText) => {
                setDateTime(newText);
              }}
            />
          </View>
          <View style={styles.picker}>
            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={dogData}
              onValueChange={(itemValue) => {
                setDogData(itemValue);
              }}
            >
              {dogDataArray.map((dog) => (
                <Picker.Item label={dog.name} value={dog} />
              ))}
            </Picker>
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
