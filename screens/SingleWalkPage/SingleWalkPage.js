import React from 'react';
import { Text, View, Image, ScrollView, Button, Linking, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styles from './styles';

export default function SingleWalkPage({ route }) {
  const { chosenWalk } = route.params;
  const { dog } = route.params;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Walk Info:</Text>
        <Text>
          <View style={styles.walk_img_contain}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: `${dog.imageUrl}`,
              }}
            />
          </View>
          {'\n'}
          <Text style={styles.boldText}>Dog name:</Text> {dog.name}
          {'\n'}
          <Text style={styles.boldText}>Dog size: </Text>
          {dog.size}
          {'\n'}
          <Text style={styles.boldText}>Dog info: </Text>
          {dog.dogBio} {'\n'} {'\n'}
          <Text style={styles.boldText}>Date and time: </Text>
          <Text>
            {chosenWalk.dateTime}
            {'\n'}
          </Text>
          <Text style={styles.boldText}>Post code: </Text>{' '}
          <Text>
            {chosenWalk.postCode}
            {'\n'}
          </Text>
          <Text style={styles.boldText}>Walk time: </Text>
          {chosenWalk.walkMinutes}
          min {'\n'}
          <Text style={styles.boldText}>Dog age: </Text>{' '}
          {new Date(Date.now()).getFullYear() - new Date(dog.dateOfBirth).getFullYear()} {'\n'}
          <Text style={styles.boldText}>Walk requirements: </Text>
          {chosenWalk.walkRequirements}
          {'\n'}
          <Text style={styles.boldText}>Walk description: </Text>
          {chosenWalk.walkDesc}
          {'\n'}
        </Text>
        <Button
          title="Call owner"
          onPress={() => {
            handleCallNow(chosenWalk.phoneNumberMiguelTest);
          }}
        />
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
          >
            <Callout>
              <Text>
                <Text style={styles.boldText}>Pick up time: </Text>
                {chosenWalk.dateTime}
                {'\n'}
                <Text style={styles.boldText}>Post Code: </Text>
                {chosenWalk.postCode}
                {'\n'}
                <Text style={styles.boldText}>Doggo name: </Text>
                {dog.name}
                {'\n'}
                <Text style={styles.boldText}>Duration: </Text>
                {chosenWalk.walkMinutes} min
                {'\n'}
                <Text style={styles.boldText}>Size: </Text>
                {dog.size}
                {'\n'}
              </Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
    </ScrollView>
  );
}

// lets press number and start call
function handleCallNow(phoneNumberFromWalks) {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumberFromWalks}`;
  } else {
    phoneNumber = `telprompt:555555555`;
  }

  Linking.openURL(phoneNumber);
}
