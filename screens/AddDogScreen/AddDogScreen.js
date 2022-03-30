import { KeyboardAvoidingView, Text, TextInput, View, ScrollView, Picker, Image } from 'react-native';
import { useState, useContext } from 'react';
import Button from 'react-native-button';
import { set, ref, push, update } from 'firebase/database';
import { database } from '../../firebase';
import UserContext from '../../contexts/UserContext';
import styles from './Styles';
import { useEffect } from 'react/cjs/react.production.min';

function AddDogScreen({ navigation }) {


  const { user } = useContext(UserContext);

  // name state 
  const [dogName, setDogName] = useState("");
  const [dogNameValid, setDogNameValid] = useState(true);

  // URL state
  const [dogUrl, setDogUrl] = useState("")
  const [dogUrlValid, setDogUrlValid] = useState(true);
  const [dogImage, setDogImage] = useState(false);

  // Dog Bio states
  const [bio, setBio] = useState('');
  const [bioValid, setBioValid] = useState(true);

  //date of birthstate
  const [dogDateOfBirth, setDogDateOfBirth] = useState("");
  const [dogDateOfBirthValid, setDogDateOfBirthValid] = useState(true);

  //size state
  const [size, setSize] = useState('Medium');

  // post code state
  const [dogPostCode, setDogPostCode] = useState(user.postCode);


  const DateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

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

    if (!DateRegex.test(dogDateOfBirth)) {
      setDogDateOfBirthValid(false);
      validDogAdd = false;
    }

    if (!validDogAdd) {
      return alert("Please check you've entered all information correctly");
    }

    const updateDog = push(ref(database, `data/dogs/${user.uid}`), {

      createdAt: Date.now(),
      name: dogName,
      imageUrl: dogUrl,
      dateOfBirth: dogDateOfBirth,
      size,
      dogBio: bio,
      postCode: dogPostCode

    });

    update(ref(database, `data/dogs/${user.uid}/${updateDog.key}`), {
      dogId: updateDog.key
    })
      .then(() => {
        navigation.navigate('MyDogsScreen');
        alert("Dog added successfully");
      })
      .catch((err) => {
        alert(err.message);
      })


  };

  const pickUpUri = (dogUrl) => {

    if (dogImage)
      return dogUrl;
    else
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
  }


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
              <Text style={styles.text}>Dog image</Text>
              <Image source={{ uri: pickUpUri(dogUrl) }} alt="no image" style={styles.img} resizeMode="contain" />
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

                  setDogImage(/^.+[.].+[.].+[.](png|jpg)$/.test(dogUrl));
                }}
              />

              {!dogUrlValid ? (
                <View>
                  <Text style={styles.invalid_input}>* Invalid dog URL, must be PNG/JPG</Text>
                </View>
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
                  setDogDateOfBirthValid(DateRegex.test(dogDateOfBirth));
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

            <View>
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

            </View>



            <View style={styles.save_cancel}>
              <View style={styles.save_press}>
                <Text onPress={handleAddDog} style={styles.cancel_save_text}>
                  Add Dog
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
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default AddDogScreen;
