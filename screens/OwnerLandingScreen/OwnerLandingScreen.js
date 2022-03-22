import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect } from 'react';

import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';

const OwnerLandingScreen = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(database, `data/users/${user}`), (res) => {
      setUserDetails(res);
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
    <View>
      <Text>{userDetails['firstName']}</Text>
      <Text>OwnerLandingScreen!</Text>
    </View>
  );
};

export default OwnerLandingScreen;
