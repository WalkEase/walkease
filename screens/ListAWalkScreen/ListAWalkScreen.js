import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import Button from 'react-native-button';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { config } from '../../.api';

function ListAWalkScreen({ navigation }) {
  const [walkDesc, setWalkDesc] = useState('');
  const [walkDescValid, setWalkDescValid] = useState('');

  const [walkRequirements, setWalkRequirements] = useState('');
  const [walkRequirementsValid, setWalkRequirementsValid] = useState('');

  const [walkMinutes, setWalkMinutes] = useState('');
  const [walkMinutesValid, setWalkMinutesValid] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogNameValid, setDogNameValid] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [dogObject, setDogsObject] = useState('');
  const [postCode, setPostCode] = useState('');
  const { user } = useContext(UserContext);

  const [dateTime, setDateTime] = useState('');

  const postCodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/gi;

  // fetching owners dogs data:
  useEffect(() => {
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

  // push dogs data to array
  const dogsIdsArray = Object.keys(dogObject);
  const dogDataArray = [];
  dogsIdsArray.map((dog) => dogDataArray.push(dogObject[dog]));
  let validSignUp = true;
  // handle submit button
  function HandleSubmit() {
    if (!/^[a-zA-Z]+$/.test(walkDesc)) {
      setWalkRequirementsValid(false);
      validSignUp = false;
    }

    if (!/^[a-zA-Z]+$/.test(walkRequirements)) {
      setWalkMinutesValid(false);
      validSignUp = false;
    }

    if (!/^[0-9]+$/.test(walkMinutes)) {
      setWalkMinutesValid(false);
      validSignUp = false;
    }
    if (dogNameValid === 'Please choose dog') {
      setDogNameValid(false);
      validSignUp = false;
    }

    if (!validSignUp) return alert("Please check you've entered all information correctly");

    // checking if post code and dogID valid before sending to Api
    if (dogName.dogId !== undefined) {
      if (postCode.match(postCodeRegex) != null) {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${config.MY_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'ZERO_RESULTS') {
              alert('Please provide valid Post Code Error: API');
            } else {
              const updateWalk = push(ref(database, `data/walks/${user.uid}`), {
                createdAt: Date.now(),
                dogId: dogName.dogId,
                walkDesc,
                walkRequirements,
                walkMinutes,
                dateTime,
                postCode: data.results[0].address_components[0].long_name,
                coordinates: data.results[0].geometry.location,
              });
              update(ref(database, `data/walks/${user.uid}/${updateWalk.key}`), {
                walkId: updateWalk.key,
              });
              update(ref(database, `data/walks/${user.uid}/${updateWalk.key}`), {
                userId: user.uid,
              });
            }
          })
          .then(() => {
            navigation.navigate('MyListedWalksScreen');
          })
          .catch((error) => alert(error.message));
      } else {
        return alert('Please provide valid Post Code Error: regex');
      }
    } else {
      return alert('Please choose the dog');
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
              placeholder="Walk Description"
              onChangeText={(newText) => {
                setWalkDesc(newText);
              }}
              onFocus={() => {
                setWalkDescValid(true);
              }}
              onBlur={() => {
                setWalkDescValid(/^[a-zA-Z]+$/.test(walkDesc));
              }}
            />

            {!walkDescValid ? (
              <Text style={styles.invalid_input}>* walk description required(letters only)</Text>
            ) : (
              false
            )}

            <TextInput
              style={styles.login_input}
              defaultValue={walkRequirements}
              placeholder="Walk Requirements"
              onChangeText={(newText) => {
                setWalkRequirements(newText);
              }}
              onFocus={() => {
                setWalkRequirementsValid(true);
              }}
              onBlur={() => {
                setWalkRequirementsValid(/^[a-zA-Z]+$/.test(walkRequirements));
              }}
            />

            {!walkRequirementsValid ? (
              <Text style={styles.invalid_input}>* walk requirements required (letters only)</Text>
            ) : (
              false
            )}

            <TextInput
              style={styles.login_input}
              defaultValue={walkMinutes}
              placeholder="Walking minutes"
              onChangeText={(newText) => {
                setWalkMinutes(newText);
              }}
              onFocus={() => {
                setWalkMinutesValid(true);
              }}
              onBlur={() => {
                setWalkMinutesValid(/^[0-9]*$/.test(walkMinutes));
              }}
            />

            {!walkMinutesValid ? (
              <Text style={styles.invalid_input}>* minutes required (numbers only)</Text>
            ) : (
              false
            )}

            <TextInput
              style={styles.login_input}
              defaultValue={postCode}
              placeholder="Post Code"
              onChangeText={(newText) => {
                setPostCode(newText.toUpperCase());
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
          <View style={styles.login_input}>
            <Picker
              style={{ height: 17, width: 180 }}
              selectedValue={dogName}
              onValueChange={(itemValue) => {
                setDogName(itemValue);
              }}
            >
              <Picker.Item label="Please choose dog" value="Please choose dog" />
              {dogDataArray.map((dog) => (
                <Picker.Item key={dog.dogId} label={dog.name} value={dog} />
              ))}
            </Picker>
          </View>
          {!dogNameValid ? (
            <Text style={styles.invalid_input}>* Please select your Dog</Text>
          ) : (
            false
          )}

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
