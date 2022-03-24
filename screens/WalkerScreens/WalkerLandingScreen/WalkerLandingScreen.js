import { Image, Text, View } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';

import UserContext from '../../../contexts/UserContext';
import { database } from '../../../firebase';
import styles from './styles';

function WalkerLandingScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
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
  );
}

export default WalkerLandingScreen;
