import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { database } from '../../firebase';
import { onValue, ref } from 'firebase/database';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

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
    <>
      <Header />
      <ScrollView style={styles.bio_scrollview}>
        <View style={styles.main_container}>
          <Image
            style={styles.avatar}
            source={{
              uri: userDetails.avatarUrl,
            }}
          />
          <View style={styles.details_list}>
            <View style={styles.header_info}>
              <Text style={styles.details_list_name}>
                {`${userDetails.firstName} ${userDetails.lastName}`}
              </Text>
            </View>
            <View style={styles.header_info_map}>
              <Image style={styles.map_img} source={require('../../assets/map_icon.png')} />
              <Text style={styles.details_list_item}>{userDetails.postCode}</Text>
            </View>
            <View style={styles.header_info}>
              <Text style={styles.details_list_header}>DoB</Text>
              <Text style={styles.details_list_item}>{userDetails.dateOfBirth}</Text>
            </View>
            <View style={styles.header_info}>
              <Text style={styles.details_list_header}>About you</Text>

              <Text style={styles.details_list_item_bio}>{userDetails.userBio}</Text>
              {/* </ScrollView> */}
            </View>
          </View>
          <Text style={styles.details_list_header}>Edit</Text>
        </View>
      </ScrollView>
      <Nav navigation={navigation} />
    </>
  );
};

export default MyDetailsScreen;
