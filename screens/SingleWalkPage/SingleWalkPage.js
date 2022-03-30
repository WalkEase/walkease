import React from 'react';
import { Text, View, Image, ScrollView, Button, Linking, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Nav from '../../components/Nav/Nav';
import styles from './styles';

export default function SingleWalkPage({ route, navigation }) {
  const { chosenWalk } = route.params;
  const { dog } = route.params;

  const parsedDate = new Date(chosenWalk.dateTime);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Full Walk Information</Text>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: chosenWalk.coordinates.lat,
            longitude: chosenWalk.coordinates.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            key={chosenWalk.walkId}
            coordinate={{
              latitude: chosenWalk.coordinates.lat,
              longitude: chosenWalk.coordinates.lng,
            }}
          ></Marker>
        </MapView>

        <ScrollView style={styles.scrollView}>
          <View style={styles.main_container}>
            <Text style={styles.about_dog_text}>The dog you'll be walking</Text>
            <View style={styles.dog_info_contain}>
              <View style={styles.walk_img_contain}>
                <View>
                  <Text style={styles.dog_name}>{dog.name}</Text>
                  <Text style={styles.boldText}>{dog.size} size</Text>
                  <Text style={styles.boldText}>
                    {new Date(Date.now()).getFullYear() - new Date(dog.dateOfBirth).getFullYear()}{' '}
                    years old
                  </Text>
                </View>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `${dog.imageUrl}`,
                  }}
                />
              </View>
              <Text style={styles.boldText_info}>About the dog: </Text>
              <Text style={styles.boldText}>{dog.dogBio} </Text>
            </View>
            <Text style={styles.about_dog_text}>Walk Information</Text>
            <View style={styles.walk_text_contain}>
              <Text style={styles.boldText_info}>Date and time: </Text>
              <Text style={styles.boldText}>
                {`${parsedDate.getDate()}/${parsedDate.getMonth()}/${parsedDate.getFullYear()}, ${parsedDate.getHours()}:${parsedDate.getMinutes()}`}
              </Text>
              <Text style={styles.boldText}>{chosenWalk.walkMinutes} minutes long</Text>
              <Text style={styles.boldText_info}>Post code: </Text>
              <Text style={styles.boldText}>{chosenWalk.postCode}</Text>

              <Text style={styles.boldText_info}>Walk requirements: </Text>
              <Text style={styles.boldText}>{chosenWalk.walkRequirements}</Text>
              <Text style={styles.boldText_info}>Description: </Text>
              <Text style={styles.boldText}>{chosenWalk.walkDesc}</Text>
              <View style={styles.call_button_contain}>
                <Text
                  style={styles.call_button}
                  title="Call owner"
                  onPress={() => {
                    handleCallNow(chosenWalk.phoneNumber);
                  }}
                >
                  Call owner
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Nav navigation={navigation} />
    </>
  );
}

// lets press number and start call
function handleCallNow(phoneNumberFromWalks) {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumberFromWalks}`;
  } else {
    phoneNumber = `telprompt:${phoneNumberFromWalks}`;
  }

  Linking.openURL(phoneNumber);
}
