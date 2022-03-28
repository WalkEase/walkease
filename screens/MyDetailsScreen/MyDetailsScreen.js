import React, { useContext } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import UserContext from '../../contexts/UserContext';
import styles from './styles';

import Nav from '../../components/Nav/Nav';

function MyDetailsScreen({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <ScrollView style={styles.bio_scrollview}>
        <View style={styles.main_container}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.avatarUrl,
            }}
          />
          <View style={styles.details_list}>
            <View style={styles.header_info}>
              <Text style={styles.details_list_name}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.details_list_userType}>{user.userType}</Text>
            </View>
            <View style={styles.header_info_map}>
              <Image style={styles.map_img} source={require('../../assets/map_icon.png')} />
              <Text style={styles.details_list_item}>{user.postCode}</Text>
            </View>
            <View style={styles.list_detail_contain}>
              <Text style={styles.details_list_header}>DoB</Text>
              <Text style={styles.details_list_item}>{user.dateOfBirth}</Text>
            </View>
            <View style={styles.list_detail_contain}>
              <Text style={styles.details_list_header}>About you</Text>

              <Text style={styles.details_list_item_bio}>{user.userBio}</Text>
              {/* </ScrollView> */}
              <Text
                style={styles.details_list_edit}
                onPress={() => {
                  navigation.navigate('EditMyDetailsScreen');
                }}
              >
                Edit details
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Nav navigation={navigation} />
    </>
  );
}

export default MyDetailsScreen;
