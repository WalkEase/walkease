import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import Button from 'react-native-button';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { config } from '../../.api';
import Nav from '../../components/Nav/Nav';

function ListAWalkScreen({ navigation }) {
  const [walkDesc, setWalkDesc] = useState('');
  const [walkDescValid, setWalkDescValid] = useState(true);

  const [walkRequirements, setWalkRequirements] = useState('');
  const [walkRequirementsValid, setWalkRequirementsValid] = useState(true);

  const [walkMinutes, setWalkMinutes] = useState('');
  const [walkMinutesValid, setWalkMinutesValid] = useState(true);
  const [dogId, setDogId] = useState('Please choose dog');
  const [pickedDog, setPickedDog] = useState({});

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
  if (!dogObject) {
    return (
      <>
        <View style={styles.main_container}>
          <View style={styles.no_walks_container}>
            <Text style={styles.no_walks_text}>
              There's currently no dogs on your account! Please add a dog{' '}
              <Text
                style={styles.here_text}
                onPress={() => {
                  navigation.navigate('AddDogScreen');
                }}
              >
                HERE
              </Text>
            </Text>
          </View>
        </View>
        <Nav navigation={navigation} />
      </>
    );
  }
  let validSignUp = true;

  // push dogs data to array
  const dogsIdsArray = Object.keys(dogObject);
  const dogDataArray = [];
  dogsIdsArray.map((dog) => dogDataArray.push(dogObject[dog]));

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

    if (!validSignUp) return alert("Please check you've entered all information correctly");

    // checking if post code and dogID valid before sending to Api
    if (pickedDog.dogId !== undefined) {
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
                dogId: pickedDog.dogId,
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
              return 'dataUpdated';
            }
          })
          .then((dataUpdated) => {
            console.log(dataUpdated);
            if (dataUpdated !== undefined) navigation.navigate('MyListedWalksScreen');
          })
          .catch((error) => alert(error.message));
      } else {
        return alert('Please provide valid Post Code Error: regex');
      }
    } else {
      return alert('Please choose the dog');
    }
  }

  if (!dogObject) {
    return (
      <>
        <View style={styles.main_container}>
          <View style={styles.no_walks_container}>
            <Text style={styles.no_walks_text}>
              There's currently no dogs on your account! Please add a dog{' '}
              <Text
                style={styles.here_text}
                onPress={() => {
                  navigation.navigate('ListAWalkScreen');
                }}
              >
                HERE
              </Text>
            </Text>
          </View>
        </View>
        <Nav navigation={navigation} />
      </>
    );
  }
  return (
    <>
      <View style={styles.main_container}>
        <ScrollView style={styles.scrollView}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.login_inputs_container}>
              <Text style={styles.header}>List a dog walk</Text>

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
                <Text style={styles.invalid_input}>
                  * walk requirements required (letters only)
                </Text>
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
            <View style={styles.picker_contain}>
              <Text style={styles.subHeader}>Dog to be walked</Text>
              <Picker
                itemStyle={styles.picker}
                style={styles.picker}
                selectedValue={dogId}
                onValueChange={(itemValue) => {
                  setDogId(itemValue);

                  setPickedDog(dogObject[itemValue]);
                }}
              >
                <Picker.Item label="Please choose dog" value="Please choose dog" />
                {dogDataArray.map((dog) => (
                  <Picker.Item key={dog.dogId} label={dog.name} value={dog.dogId} />
                ))}
              </Picker>
            </View>
            <View style={styles.save_cancel}>
              <View style={styles.save_press}>
                <Text style={styles.cancel_save_text} onPress={HandleSubmit}>
                  Submit
                </Text>
              </View>
              <View style={styles.cancel_press}>
                <Text
                  style={styles.cancel_save_text}
                  onPress={() => {
                    navigation.navigate('OwnerLandingScreen');
                  }}
                >
                  Cancel
                </Text>
              </View>
            </View>
            {/* <Button
              style={styles.login_button}
              accessibilityLabel="login-button"
              onPress={HandleSubmit}
            >
              Submit
            </Button> */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <Nav navigation={navigation} />
    </>
  );
}

export default ListAWalkScreen;
