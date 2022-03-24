import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

function MyDetailsScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
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
      <Nav navigation={navigation} />
    </>
  );
}

export default MyDetailsScreen;
