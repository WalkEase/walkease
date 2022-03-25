import { KeyboardAvoidingView, Text, TextInput, View, Picker, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import Button from 'react-native-button';
import { set, ref, get, onValue } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../firebase';
import styles from './styles';
import UserContext from '../../contexts/UserContext';

function SignUpScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  // email state
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  // password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  // name state
  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(true);

  const [userType, setUserType] = useState('Owner');
  const [postCode, setPostCode] = useState('');

  // date of birth
  const [DoB, setDoB] = useState('');

  // avatarUrl state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarUrlValid, setAvatarUrlValid] = useState(true);

  // userBio state
  const [userBio, setUserBio] = useState('');
  const [userBioValid, setUserBioValid] = useState(true);

  const [validSignUp, setValidSignUp] = useState(true);

  const handleSignUp = () => {
    // form validation

    setValidSignUp(true);

    if (!/^.+@.+.[.].+$/.test(email)) {
      setEmailValid(false);
      setValidSignUp(false);
    }

    if (password === '' || confirmPassword === '') {
      setPasswordValid(false);
      setValidSignUp(false);
    }

    if (password !== confirmPassword) {
      setPasswordValid(false);
      setValidSignUp(false);
    }

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameValid(false);
      setValidSignUp(false);
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameValid(false);
      setValidSignUp(false);
    }

    if (!/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl)) {
      setAvatarUrlValid(false);
      setValidSignUp(false);
    }

    if (userBio.length < 100 || userBio.length > 200) {
      setUserBioValid(false);
      setValidSignUp(false);
    }

    if (!validSignUp) return undefined;

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        set(ref(database, `data/users/${res.user.uid}`), {
          uid: res.user.uid,
          createdAt: Date.now(),
          email: `${email}`,
          userType,
          firstName,
          lastName,
          postCode,
          dateOfBirth: DoB,
          avatarUrl,
          userBio,
        });

        return res.user.uid;
      })
      .then((uid) => {
        onValue(ref(database, `data/users/${uid}`), (dbUser) => {
          setUser(dbUser.val());
        });

        return get(ref(database, `data/users/${uid}`));
      })
      .then((user) => {
        const userTypeIn = user.val().userType;

        navigation.navigate(`${userTypeIn}LandingScreen`);
      })
      .catch((error) => alert(error.message));

    return undefined;
  };

  return (
    <View style={styles.main_contain}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.login_inputs_container}>
            <Text style={styles.header}>WalkEase</Text>

            <TextInput
              style={styles.login_input}
              defaultValue={email}
              placeholder="Email"
              onChangeText={(newText) => {
                setEmail(newText);
              }}
              onFocus={() => {
                setEmailValid(true);
              }}
              onBlur={() => setEmailValid(/^.+@.+.[.].+$/.test(email))}
            />
            {!emailValid ? <Text style={styles.invalid_input}>* Invalid email format</Text> : false}

            <TextInput
              style={styles.login_input}
              defaultValue={password}
              placeholder="Password"
              onChangeText={(newText) => {
                setPassword(newText);
              }}
              onFocus={() => setPasswordValid(true)}
              onBlur={() => {
                if (password === '' || confirmPassword === '' || password !== confirmPassword) {
                  setPasswordValid(false);
                }
              }}
              secureTextEntry
            />

            <TextInput
              style={styles.login_input}
              defaultValue={confirmPassword}
              placeholder="Confirm password"
              onChangeText={(newText) => {
                setConfirmPassword(newText);
              }}
              onFocus={() => setPasswordValid(true)}
              onBlur={() => {
                if (password === '' || confirmPassword === '' || password !== confirmPassword) {
                  setPasswordValid(false);
                }
              }}
              secureTextEntry
            />

            {!passwordValid ? (
              <Text style={styles.invalid_input}>
                * Please enter matching passwords in both fields
              </Text>
            ) : (
              false
            )}

            <View style={styles.picker}>
              <Picker
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
              >
                <Picker.Item label="Owner" value="Owner" />
                <Picker.Item label="Walker" value="Walker" />
              </Picker>
            </View>

            <TextInput
              style={styles.login_input}
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

            <TextInput
              style={styles.login_input}
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
              defaultValue={DoB}
              placeholder="DD/MM/YYYY"
              onChangeText={(newText) => {
                setDoB(newText);
              }}
            />

            <TextInput
              style={styles.login_input}
              defaultValue={avatarUrl}
              placeholder="Web link to image"
              onChangeText={(newText) => {
                setAvatarUrl(newText);
              }}
              onFocus={() => {
                setAvatarUrlValid(true);
              }}
              onBlur={() => {
                setAvatarUrlValid(/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl));
              }}
            />

            {!avatarUrlValid ? (
              <Text style={styles.invalid_input}>* Invalid avatar URL, must be PNG/JPG</Text>
            ) : (
              false
            )}

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
              <Text style={styles.invalid_input}>
                {`Bio must be between 100 - 200 chars... Current length: ${userBio.length} chars`}
              </Text>
            ) : (
              false
            )}
          </View>

          <Button
            style={styles.login_button}
            accessibilityLabel="login-button"
            onPress={handleSignUp}
          >
            Sign Up
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;
