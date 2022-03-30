import React, { useContext, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { set, ref } from 'firebase/database';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import styles from './styles';
import UserContext from '../../contexts/UserContext';
import DateInput from '../../components/DateInput/DateInput';

function EditMyDetailsScreen({ navigation }) {
  const { user } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [validAvatarUrl, setValidAvatarUrl] = useState(true);
  const [avatarImage, setAvatarImage] = useState(true);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [postCode, setPostCode] = useState(user.postCode);

  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [dateOfBirthValid, SetDateOfBirthVaild] = useState(true);

  const [userBio, setUserBio] = useState(user.userBio);

  function handleSave() {
    const newObj = { ...user };

    newObj.avatarUrl = avatarUrl;
    newObj.firstName = firstName;
    newObj.lastName = lastName;
    newObj.phoneNumber = phoneNumber;
    newObj.postCode = postCode;
    newObj.dateOfBirth = dateOfBirth;
    newObj.userBio = userBio;

    set(ref(database, `data/users/${user.uid}`), newObj)
      .then(() => navigation.navigate('MyDetailsScreen'))
      .catch((error) => alert(error.message));
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
              value={firstName}
              onChangeText={(newText) => {
                setFirstName(newText);
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.input_contain}>
            <TextInput
              value={lastName}
              onChangeText={(newText) => {
                setLastName(newText);
              }}
              style={styles.input}
            />
          </View>

          <View style={styles.input_contain}>
            <TextInput
              value={phoneNumber}
              onChangeText={(newText) => {
                setPhoneNumber(newText);
              }}
              style={styles.input}
            />
          </View>

          <View style={styles.input_contain}>
            <TextInput
              autoCapitalize="characters"
              value={postCode}
              onChangeText={(newText) => {
                setPostCode(newText);
              }}
              style={styles.input}
            />
          </View>

          <View>
            <Text>Date of Birth</Text>
            <DateInput
              setGivenState={setDateOfBirth}
              setStateValid={SetDateOfBirthVaild}
              defaultValues={{
                defaultMonth: new Date(dateOfBirth).getMonth(),
                defaultDay: String(new Date(dateOfBirth).getDate()),
                defaultYear: String(new Date(dateOfBirth).getFullYear()),
              }}
            />
          </View>

          <ScrollView style={[styles.input_contain, styles.input_contain_bio]}>
            <TextInput
              multiline
              value={userBio}
              onChangeText={(newText) => {
                setUserBio(newText);
              }}
              style={styles.input}
            />
          </ScrollView>
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
