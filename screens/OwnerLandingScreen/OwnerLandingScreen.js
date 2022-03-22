import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
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
    <View>
      <Text>OwnerLandingScreen</Text>
      <Image
        source={{
          uri: 'https://pngimg.com/uploads/doge_meme/doge_meme_PNG6.png',
        }}
      />
      <Text>{`Good Morning ${userDetails['firstName']}!`}</Text>
    </View>
  );
};

export default OwnerLandingScreen;
