import MapView, { Marker, Callout } from 'react-native-maps';
import { Text, View, Button, ScrollView, Image } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import styles from './styles';

function handleBluePinFromList(walk) {
  if (walk !== undefined) {
    return (
      <Marker
        pinColor="blue"
        coordinate={{
          latitude: walk.coordinates.lat,
          longitude: walk.coordinates.lng,
        }}
      >
        <Callout />
      </Marker>
    );
  }
}

export default function WalkerWalkMap({ navigation }) {
  const [handleListColour, setHandleListColour] = useState();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [isLoadingWalks, setIsLoadingWalks] = useState(true);
  const [isLoadingDogs, setIsLoadingDogs] = useState(true);
  const [dogObject, setDogsObject] = useState('');
  const [walkData, setWalkData] = useState();

  const walksNestedArray = [];
  const walksArray = [];

  {
    // fetch walks data from database
    useEffect(() => {
      onValue(
        ref(database, `data/walks`),
        (res) => {
          setDataFromApi(res.val());
          setIsLoadingWalks(false);
        },
        {
          onlyOnce: true,
        }
      );
    }, []);

    // fetch dogs data from database
    useEffect(() => {
      onValue(
        ref(database, `data/dogs`),
        (res) => {
          setDogsObject(res.val());
          setIsLoadingDogs(false);
        },
        {
          onlyOnce: true,
        }
      );
    }, []);

    if (isLoadingWalks)
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    if (isLoadingDogs)
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );

    // convert all walks data to flat array

    const walkersIdArray = Object.keys(dataFromApi);
    walkersIdArray.map((user) => {
      walksArray.push(dataFromApi[user]);
    });

    walksArray.map((data) => {
      walksNestedArray.push(Object.values(data));
    });
    const walksFlatArray = walksNestedArray.flat();

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: 53.48093470818428,
            longitude: -2.242502936136497,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* display markers in map */}

          {walksFlatArray.map((walk) => (
            <Marker
              key={walk.walkId}
              // pinColor={}
              onPress={() => {}}
              coordinate={{
                latitude: walk.coordinates.lat,
                longitude: walk.coordinates.lng,
              }}
            >
              <Callout>
                <Text>
                  <Text style={styles.boldText}>Pick up time: </Text>
                  {walk.dateTime}
                  {'\n'}
                  <Text style={styles.boldText}>Post Code: </Text>
                  {walk.postCode}
                  {'\n'}
                  <Text style={styles.boldText}>Doggo name: </Text>
                  {dogObject[walk.userId][walk.dogId].name}
                  {'\n'}
                  <Text style={styles.boldText}>Duration: </Text>
                  {walk.walkMinutes} min
                  {'\n'}
                  <Text style={styles.boldText}>Size: </Text>
                  {dogObject[walk.userId][walk.dogId].size}
                  {'\n'}
                  more info link {'\n'}
                </Text>
              </Callout>
            </Marker>
          ))}
          {handleBluePinFromList(walkData)}
        </MapView>

        {/* display walks list */}
        <Text style={styles.walkListTitle}>Dog walks available: </Text>
        <ScrollView style={styles.scrollView}>
          {walksFlatArray.map((walk) => (
            <Text
              key={walk.walkId}
              style={
                handleListColour === walk.walkId ? styles.walkListItems2 : styles.walkListItems
              }
              onPress={() => {
                setWalkData(walk);
                setHandleListColour(walk.walkId);
              }}
            >
              <Text style={styles.boldText}>Pick up time: </Text>
              {walk.dateTime}
              {'\n'}
              <Text style={styles.boldText}>Post Code: </Text>
              {walk.postCode}
              {'\n'}
              <Text style={styles.boldText}>Doggo name: </Text>
              {dogObject[walk.userId][walk.dogId].name}
              {'\n'}
              <Text style={styles.boldText}>Duration: </Text>
              {walk.walkMinutes} min
              {'\n'}
              <Text style={styles.boldText}>Size: </Text>
              {dogObject[walk.userId][walk.dogId].size}
              {'\n'}
              <Button title="more info" onPress={() => navigation.navigate('LoginScreen')}>
                {/* landing page should be changed */}
                more info
              </Button>
              {'\n'}
              {/* display dog picture */}
              <View>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: `${dogObject[walk.userId][walk.dogId].imageUrl}`,
                  }}
                />
              </View>
            </Text>
          ))}
        </ScrollView>
        <View style={styles.tempBottomNav}>
          <Text>Temp Bottom nav bar</Text>
          <Button title="Go to login screen" onPress={() => navigation.navigate('LoginScreen')}>
            Back to Login
          </Button>
        </View>
      </View>
    );
  }
}
