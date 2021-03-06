import { Image, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth'
import UserContext from '../../../contexts/UserContext';
import styles from './styles';
import { auth } from '../../../firebase'


function WalkerLandingScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <View style={styles.main_container}>
        <View style={styles.welcome_contain} />
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatarUrl,
          }}
        />
        <View style={styles.welcome_contain}>
          <Text style={styles.welcome_name}>{`Welcome ${user.firstName}`}</Text>
        </View>
        <View style={styles.walker_list}>
          <View style={styles.walker_list_link_bottom_border}>
            <Text
              style={styles.walker_list_item}
              onPress={() => {
                navigation.navigate('WalksMapScreen');
              }}
            >
              Walks Map
            </Text>
          </View>
          <View style={styles.walker_list_link_bottom_border}>
            <Text
              style={styles.walker_list_item}
              onPress={() => {
                navigation.navigate('MyDetailsScreen');
              }}
            >
              My Details
            </Text>
          </View>
          <View style={styles.walker_list_link_bottom_border}>
            <Text
              style={styles.walker_list_item}
              onPress={() => {
                signOut(auth).then(() => {
                  setUser({})
                  navigation.navigate('LoginScreen');
                })
                  .catch((err) => {
                    alert('err sign out', err)
                  })
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
export default WalkerLandingScreen;