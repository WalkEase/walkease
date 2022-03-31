import { Image, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { signOut } from 'firebase/auth';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { auth } from '../../firebase';

function OwnerLandingScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <View style={styles.main_container}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatarUrl,
          }}
        />
        <View style={styles.welcome_contain}>
          <Text style={styles.welcome_name}>{`Welcome ${user.firstName}`}</Text>
        </View>
        <View style={styles.owner_list}>
          <View style={styles.owner_list_link_bottom_border}>
            <Text
              style={styles.owner_list_item}
              onPress={() => {
                navigation.navigate('MyDogsScreen');
              }}
            >
              My Dogs
            </Text>
          </View>
          <View style={styles.owner_list_link_bottom_border}>
            <Text
              style={styles.owner_list_item}
              onPress={() => {
                navigation.navigate('ListAWalkScreen');
              }}
            >
              List a walk
            </Text>
          </View>
          <View style={styles.owner_list_link_bottom_border}>
            <Text
              style={styles.owner_list_item}
              onPress={() => {
                navigation.navigate('MyListedWalksScreen');
              }}
            >
              Listed Walks
            </Text>
          </View>
          <View style={styles.owner_list_link_bottom_border}>
            <Text
              style={styles.owner_list_item}
              onPress={() => {
                navigation.navigate('MyDetailsScreen');
              }}
            >
              My Details
            </Text>
          </View>

          <View style={styles.owner_list_link_bottom_border}>
            <Text
              style={styles.owner_list_item}
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    setUser({});
                    navigation.navigate('LoginScreen');
                  })
                  .catch((err) => {
                    alert('err sign out', err);
                  });
              }}
            >
              Sign Out
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.nav_container} />
    </>
  );
}

export default OwnerLandingScreen;
