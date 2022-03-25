import { Image, Text, View } from 'react-native';
import React, { useContext } from 'react';

import UserContext from '../../../contexts/UserContext';
import styles from './styles';
import Header from '../../../components/Header/Header';

function WalkerLandingScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <View style={styles.main_container}>
        <View style={styles.welcome_contain}></View>
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
                navigation.navigate('WalksListScreen');
              }}
            >
              Walks List
            </Text>
          </View>
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
        </View>
      </View>
      <View style={styles.nav_container}></View>
    </>
  );
}

export default WalkerLandingScreen;
