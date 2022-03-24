import React, { useContext, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { set, ref } from 'firebase/database';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import styles from './styles';
import UserContext from '../../contexts/UserContext';

function EditMyDetailsScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [postCode, setPostCode] = useState(user.postCode);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [userBio, setUserBio] = useState(user.userBio);

  function handleSave() {
    const newObj = { ...user };

    newObj.avatarUrl = avatarUrl;
    newObj.firstName = firstName;
    newObj.lastName = lastName;
    newObj.postCode = postCode;
    newObj.dateOfBirth = dateOfBirth;
    newObj.userBio = userBio;

    set(ref(database, `data/users/${user.uid}`), newObj)
      .then(() => navigation.navigate('MyDetailsScreen'))
      .catch((error) => alert(error.message));
  }

  return (
    <>
      <Header />
      <ScrollView style={styles.bio_scrollview}>
        <View style={styles.main_container}>
          <Text>Edit your details</Text>
          <Image
            style={styles.avatar}
            source={{
              uri: avatarUrl,
            }}
          />
          <TextInput
            value={avatarUrl}
            onChangeText={(newText) => {
              setAvatarUrl(newText);
            }}
            style={styles.input}
          />
          <TextInput
            value={firstName}
            onChangeText={(newText) => {
              setFirstName(newText);
            }}
          />
          <TextInput
            value={lastName}
            onChangeText={(newText) => {
              setLastName(newText);
            }}
          />
          <TextInput
            value={postCode}
            onChangeText={(newText) => {
              setPostCode(newText);
            }}
          />
          <TextInput
            value={dateOfBirth}
            onChangeText={(newText) => {
              setDateOfBirth(newText);
            }}
          />
          <TextInput
            value={userBio}
            onChangeText={(newText) => {
              setUserBio(newText);
            }}
          />
        </View>
        <View style={styles.save_cancel}>
          <Text onPress={handleSave}>Save</Text>
          <Text
            onPress={() => {
              navigation.navigate('MyDetailsScreen');
            }}
          >
            Cancel
          </Text>
        </View>
      </ScrollView>
      <Nav />
    </>
  );
}

export default EditMyDetailsScreen;
