import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect } from 'react';

import UserContext from '../../../contexts/UserContext';
import { database } from '../../../firebase';
import styles from './styles';

const WalkerLandingScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(database, `data/users/${user}`), (res) => {
      setUserDetails(res.val());
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.main_container}>
      <Text>WalkerLandingScreen</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: userDetails.avatarUrl,
        }}
      />
      <Text>{`Good Morning ${userDetails['firstName']}!`}</Text>
      <View style={styles.walker_list}>
        <Text
          style={styles.walker_list_item}
          onPress={() => {
            navigation.navigate('');
          }}
        >
          Walks List
        </Text>
        <Text
          style={styles.walker_list_item}
          onPress={() => {
            navigation.navigate('');
          }}
        >
          Walks Map
        </Text>
        <Text
          style={styles.walker_list_item}
          onPress={() => {
            navigation.navigate('');
          }}
        >
          My Details
        </Text>
      </View>
    </View>
  );
};

export default WalkerLandingScreen;
