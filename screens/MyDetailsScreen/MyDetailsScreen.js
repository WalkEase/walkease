import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { onValue, ref } from 'firebase/database';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { database } from '../../firebase';

function MyDetailsScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.main_container}>
      <Text>My Details</Text>

      <Image
        style={styles.avatar}
        source={{
          uri: user.avatarUrl,
        }}
      />
      <View style={styles.details_list}>
        <Text style={styles.details_list_item}>Name: {`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.details_list_item}>Location: {user.postCode}</Text>
        <Text style={styles.details_list_item}>DoB: {user.dateOfBirth}</Text>
        <Text style={styles.details_list_item}>Bio: {user.userBio}</Text>
      </View>
    </View>
  );
}

export default MyDetailsScreen;
