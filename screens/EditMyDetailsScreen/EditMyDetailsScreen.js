import React, { useContext, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { set, ref } from 'firebase/database';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import styles from './styles';
import UserContext from '../../contexts/UserContext';
import DateInput from '../../components/DateInput/DateInput';
import { config } from '../../.api';

function EditMyDetailsScreen({ navigation }) {

  const { user } = useContext(UserContext);

  // user avatar image state
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [validAvatarUrl, setValidAvatarUrl] = useState(true);
  const [avatarImage, setAvatarImage] = useState(true);

  // first && last name states
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);

  // post code state
  const [postCode, setPostCode] = useState(user.postCode);
  const [postCodeValid, setPostCodeValid] = useState(true);
  const postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/i;

  // date of birth state
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [dateOfBirthValid, SetDateOfBirthVaild] = useState(true);

  // user Bio state
  const [userBio, setUserBio] = useState(user.userBio);
  const [userBioValid, setUserBioValid] = useState(true);

  function handleSave() {

    let validEdit = true;

    if (!/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl)) {
      setValidAvatarUrl(false);
      validEdit = false;
    }

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameValid(false);
      validEdit = false;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameValid(false);
      validEdit = false;
    }

    if (userBio.length < 100 || userBio.length > 200) {
      setUserBioValid(false);
      validEdit = false;
    }

    if (!postCodeRegex.test(postCode)) {
      setPostCodeValid(false);
      validEdit = false;
    }


    if (!validEdit) return alert("Please check you've entered all information correctly");

    const newObj = { ...user };

    newObj.avatarUrl = avatarUrl;
    newObj.firstName = firstName;
    newObj.lastName = lastName;
    newObj.postCode = postCode;
    newObj.dateOfBirth = dateOfBirth;
    newObj.userBio = userBio;

    fetch
      (
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${config.MY_API_KEY}`
      )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ZERO_RESULTS') {
          throw 'Post Code does not exist';
        } else {
          return set(ref(database, `data/users/${user.uid}`), newObj)
        }
      })
      .then(() => {
        alert("Update process successful")
        navigation.navigate('MyDetailsScreen')
      })
      .catch((err) => {
        if (err === 'Post Code does not exist') {
          alert(err);
          return setPostCodeValid(false)
        };
        return alert(err.message);
      })
  }

  const pickUpUri = (avatrUrl) => {

    if (avatarImage)
      return avatarUrl;
    else
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
  }

  return (
    <>
      <ScrollView style={styles.bio_scrollview}>
        <View style={styles.main_container}>
          <Image
            style={styles.avatar}
            source={{
              uri: pickUpUri(avatarUrl),
            }}
            resizeMode="contain"
          />
          <Text style={styles.edit_text}>Edit your details below</Text>

          <View style={styles.input_contain}>
            <TextInput
              autoCapitalize="none"
              multiline
              value={avatarUrl}
              onChangeText={(newText) => {
                setAvatarUrl(newText);
              }}
              onFocus={() => {
                setValidAvatarUrl(true);
              }}
              onBlur={() => {
                setValidAvatarUrl(/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl));
                setAvatarImage(/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl));
              }}

              style={styles.input}
            />

            {!validAvatarUrl ? (
              <View>
                <Text style={styles.invalid_input}>* Invalid avatr URL, must be PNG/JPG</Text>
              </View>
            ) : (
              false
            )}
          </View>

          <View style={styles.input_contain}>
            <TextInput
              style={styles.input}
              defaultValue={firstName}
              placeholder="First Name"
              onChangeText={(newText) => {
                setFirstName(newText);
              }}
              onFocus={() => {
                setFirstNameValid(true);
              }}
              onBlur={() => {
                setFirstNameValid(/^[a-zA-Z]+$/.test(firstName));
              }}

            />

            {!firstNameValid ? (
              <Text style={styles.invalid_input}>
                * First Name must be UPPERCASE and lowercase letters only
              </Text>
            ) : (
              false
            )}
          </View>

          <View style={styles.input_contain}>
            <TextInput
              style={styles.input}
              defaultValue={lastName}
              placeholder="Last Name"
              onChangeText={(newText) => {
                setLastName(newText);
              }}
              onFocus={() => {
                setLastNameValid(true);
              }}
              onBlur={() => {
                setLastNameValid(/^[a-zA-Z]+$/.test(lastName));
              }}
            />

            {!lastNameValid ? (
              <Text style={styles.invalid_input}>
                * Last Name must be UPPERCASE and lowercase letters only
              </Text>
            ) : (
              false
            )}
          </View>

          <View>
            <TextInput
              style={styles.login_input}
              defaultValue={postCode}
              placeholder="Post code"
              autoCapitalize="characters"
              onChangeText={(newText) => {
                setPostCode(newText);
              }}

              onFocus={() => {
                setPostCodeValid(true);
              }}
              onBlur={() => {
                setPostCodeValid(postCodeRegex.test(postCode));
              }}
            />

            {!postCodeValid ? (
              <Text style={styles.invalid_input}>* Invalid Post Code </Text>
            ) : (
              false
            )}
          </View>

          <View style={styles.DoBContainer}>
            <Text style={styles.subHeader}>Date of Birth</Text>
            <DateInput style={styles.date}
              setGivenState={setDateOfBirth}
              setStateValid={SetDateOfBirthVaild}
              defaultValues={{
                defaultMonth: new Date(dateOfBirth).getMonth(),
                defaultDay: String(new Date(dateOfBirth).getDate()),
                defaultYear: String(new Date(dateOfBirth).getFullYear()),
              }}
            />
          </View>

          <View style={styles.input_contain}>
            <TextInput
              style={styles.login_input}
              multiline
              defaultValue={userBio}
              placeholder="Tell me about yourself"
              onChangeText={(newText) => {
                setUserBio(newText);
              }}
              onFocus={() => {
                setUserBioValid(true);
              }}
              onBlur={() => {
                if (userBio.length < 100 || userBio.length > 200) setUserBioValid(false);
              }}
            />
            <Text>{userBio.length} chars</Text>

            {!userBioValid ? (
              <Text style={styles.invalid_input}>* Bio must be between 100 - 200 chars</Text>
            ) : (
              false
            )}


          </View>

          <View style={styles.save_cancel}>
            <View style={styles.save_press}>
              <Text onPress={handleSave} style={styles.cancel_save_text}>
                Save
              </Text>
            </View>
            <View style={styles.cancel_press}>
              <Text
                style={styles.cancel_save_text}
                onPress={() => {
                  navigation.navigate('MyDetailsScreen');
                }}
              >
                Cancel
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Nav navigation={navigation} />
    </>
  );
}

export default EditMyDetailsScreen;
