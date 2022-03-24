import { Image, Text, View } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';

import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import styles from './styles';

function OwnerLandingScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.main_container}>
      <Text>OwnerLandingScreen</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: user.avatarUrl,
        }}
      />
      <Text>{`Good Morning ${user.firstName}!`}</Text>
      <View style={styles.owner_list}>
        <Text
          style={styles.owner_list_item}
          onPress={() => {
            navigation.navigate('MyDogsScreen');
          }}
        >
          My Dogs
        </Text>
        <Text
          style={styles.owner_list_item}
          onPress={() => {
            navigation.navigate('ListAWalkScreen');
          }}
        >
          List a walk
        </Text>
        <Text
          style={styles.owner_list_item}
          onPress={() => {
            navigation.navigate('MyDetailsScreen');
          }}
        >
          My Details
        </Text>
        <Text
          style={styles.owner_list_item}
          onPress={() => {
            navigation.navigate('MyListedWalksScreen');
          }}
        >
          Listed Walks
        </Text>
      </View>
    </View>
  );
}

export default OwnerLandingScreen;
