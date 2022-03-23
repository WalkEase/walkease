import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { database } from '../../firebase';
import { onValue, ref } from 'firebase/database';

const MyDetailsScreen = ({ navigation }) => {
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
      <Text>My Details</Text>

      <Image
        style={styles.avatar}
        source={{
          uri: userDetails.avatarUrl,
        }}
      />
      <View style={styles.details_list}>
        <Text style={styles.details_list_item}>
          Name: {`${userDetails.firstName} ${userDetails.lastName}`}
        </Text>
        <Text style={styles.details_list_item}>Location: {userDetails.postCode}</Text>
        <Text style={styles.details_list_item}>DoB: {userDetails.dateOfBirth}</Text>
        <Text style={styles.details_list_item}>Bio: {userDetails.userBio}</Text>
      </View>
    </View>
  );
};

export default MyDetailsScreen;
