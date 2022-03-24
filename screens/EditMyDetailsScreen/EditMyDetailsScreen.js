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
          <Image
            style={styles.avatar}
            source={{
              uri: avatarUrl,
            }}
          />
          <Text style={styles.edit_text}>Edit your details below</Text>
          <View style={styles.input_contain}>
            <TextInput
              multiline
              value={avatarUrl}
              onChangeText={(newText) => {
                setAvatarUrl(newText);
              }}
              style={styles.input}
            />
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
              value={postCode}
              onChangeText={(newText) => {
                setPostCode(newText);
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.input_contain}>
            <TextInput
              value={dateOfBirth}
              onChangeText={(newText) => {
                setDateOfBirth(newText);
              }}
              style={styles.input}
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
