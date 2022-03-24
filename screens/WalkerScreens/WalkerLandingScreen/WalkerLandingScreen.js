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
        <Text>WalkerLandingScreen</Text>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatarUrl,
          }}
        />
        <Text>{`Good Morning ${user.firstName}!`}</Text>
        <View style={styles.walker_list}>
          <Text
            style={styles.walker_list_item}
            onPress={() => {
              navigation.navigate('WalksListScreen');
            }}
          >
            Walks List
          </Text>
          <Text
            style={styles.walker_list_item}
            onPress={() => {
              navigation.navigate('WalksMapScreen');
            }}
          >
            Walks Map
          </Text>
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
    </>
  );
}

export default WalkerLandingScreen;
