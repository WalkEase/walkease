import { KeyboardAvoidingView, Text, TextInput, View, Picker, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import { set, ref, get, onValue } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../firebase';
import styles from './styles';
import UserContext from '../../contexts/UserContext';
import DateInput from '../../components/DateInput/DateInput';
import { config } from '../../.api';

function SignUpScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  // email state
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  // phoneNumber state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  // password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  // name state
  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(true);

  const [userType, setUserType] = useState('Select account type');

  // date of birth state
  const [DoB, setDoB] = useState();
  const [DoBValid, setDoBValid] = useState(true);

  // post code state
  const [postCode, setPostCode] = useState('');
  const [postCodeValid, setPostCodeValid] = useState(true);
  const postCodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/i;

  // avatarUrl state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarUrlValid, setAvatarUrlValid] = useState(true);

  // userBio state
  const [userBio, setUserBio] = useState('');
  const [userBioValid, setUserBioValid] = useState(true);

  // userType state
  const [userTypeValid, setUserTypeValid] = useState(true);

  const handleSignUp = () => {
    // form validation

    let validSignUp = true;

    if (!/^.+@.+.[.].+$/.test(email)) {
      setEmailValid(false);
      validSignUp = false;
    }

    if (!/^\(?0( *\d\)?){9,10}$/.test(phoneNumber)) {
      setPhoneNumberValid(false);
      validSignUp = false;
    }

    if (password === '' || confirmPassword === '') {
      setPasswordValid(false);
      validSignUp = false;
    }

    if (password !== confirmPassword) {
      setPasswordValid(false);
      validSignUp = false;
    }

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameValid(false);
      validSignUp = false;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameValid(false);
      validSignUp = false;
    }

    if (!DoB) {
      setDoBValid(false);
      validSignUp = false;
    }

    if (!postCodeRegex.test(postCode)) {
      setPostCodeValid(false);
      validSignUp = false;
    }

    if (!/^.+[.].+[.].+[.](png|jpg)$/.test(avatarUrl)) {
      setAvatarUrlValid(false);
      validSignUp = false;
    }

    if (userBio.length < 100 || userBio.length > 200) {
      setUserBioValid(false);
      validSignUp = false;
    }

    if (userType === 'Select account type') {
      setUserTypeValid(false);
      validSignUp = false;
    }

    if (!validSignUp) return alert("Please check you've entered all information correctly");

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${config.MY_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ZERO_RESULTS') {
          throw 'Post Code does not exist';
        } else {
          return createUserWithEmailAndPassword(auth, email, password);
        }
      })
      .then((res) => {
        console.log('res', res);
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
        alert('SignUp process successful');
        navigation.navigate(`${userTypeIn}LandingScreen`);
      })
      .catch((err) => {
        if (err === 'Post Code does not exist') {
          alert(err);
          return setPostCodeValid(false);
        }
        return alert(err.message);
      });
  };

  return (
    <>
      <View style={styles.main_contain}>
        <ScrollView style={styles.signup_scrollview}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.login_inputs_container}>
              <Text style={styles.header}>Sign Up</Text>
              <TextInput
                autoCapitalize="none"
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
              {!emailValid ? (
                <Text style={styles.invalid_input}>* Invalid email format</Text>
              ) : (
                false
              )}

              <TextInput
                autoCapitalize="none"
                style={styles.login_input}
                defaultValue={phoneNumber}
                placeholder="Phone Number"
                onChangeText={(newText) => {
                  setPhoneNumber(newText);
                }}
                onFocus={() => {
                  setPhoneNumberValid(true);
                }}
                onBlur={() => setPhoneNumberValid(/^\(?0( *\d\)?){9,10}$/.test(phoneNumber))}
              />

              {!phoneNumberValid ? (
                <Text style={styles.invalid_input}>
                  * Please enter a valid UK phone number (starting with 0)
                </Text>
              ) : (
                false
              )}

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
                  <Picker.Item label="Select account type" value="Select account type" />
                  <Picker.Item label="Owner" value="Owner" />
                  <Picker.Item label="Walker" value="Walker" />
                </Picker>

                {!userTypeValid ? (
                  <Text style={styles.invalid_input}>* Please select Owner or Walker</Text>
                ) : (
                  false
                )}
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
              <View>
                <TextInput
                  style={styles.login_input}
                  defaultValue={postCode}
                  placeholder="Post code"
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

                <DateInput setGivenState={setDoB} setStateValid={setDoBValid} />

                {!DoBValid ? (
                  <Text style={styles.invalid_input}>* Please enter a valid date of birth</Text>
                ) : (
                  false
                )}
              </View>

              <TextInput
                autoCapitalize="none"
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
                <Text style={styles.invalid_input}>* Bio must be between 100 - 200 chars</Text>
              ) : (
                false
              )}
            </View>
            <View style={styles.save_cancel}>
              <View style={styles.save_press}>
                <Text onPress={() => handleSignUp()} style={styles.cancel_save_text}>
                  Sign Up
                </Text>
              </View>
              <View style={styles.cancel_press}>
                <Text
                  style={styles.cancel_save_text}
                  onPress={() => {
                    navigation.navigate('LoginScreen');
                  }}
                >
                  Cancel
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <View style={styles.nav_container} />
    </>
  );
}

export default SignUpScreen;
