import MapView, { Marker, Callout } from 'react-native-maps';
import { Text, View, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import styles from './styles';
import Nav from '../../../components/Nav/Nav';

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
      <>
        <View style={styles.container}>
          <View style={styles.header_contain}>
            <Text style={styles.header}>Dog walks available </Text>
          </View>
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

            {walksFlatArray.map((walk) => {
              const parsedDate = new Date(walk.dateTime);
              return (
                <Marker
                  key={walk.walkId}
                  // pinColor={}
                  onPress={() => {}}
                  coordinate={{
                    latitude: walk.coordinates.lat,
                    longitude: walk.coordinates.lng,
                  }}
                >
                  <Callout
                    onPress={() =>
                      navigation.navigate('SingleWalkPage', {
                        chosenWalk: walk,
                        dog: dogObject[walk.userId][walk.dogId],
                      })
                    }
                  >
                    <Text>
                      <Text style={styles.boldText}>Pick up time: </Text>
                      {`${parsedDate.getDate()}/${parsedDate.getMonth()}/${parsedDate.getFullYear()}, ${parsedDate.getHours()}:${parsedDate.getMinutes()}`}
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
                    </Text>
                  </Callout>
                </Marker>
              );
            })}
            {handleBluePinFromList(walkData)}
          </MapView>

          {/* display walks list */}

          <ScrollView style={styles.scrollView}>
            <View style={styles.main_container}>
              <View style={styles.header_list_contain}>
                <Text style={styles.header_list}>Dog walks list</Text>
              </View>
              {walksFlatArray.map((walk) => {
                const parsedDate = new Date(walk.dateTime);
                return (
                  <View key={walk.walkId} style={styles.walk_card}>
                    <TouchableOpacity
                      style={styles.walk_card}
                      style={
                        handleListColour === walk.walkId
                          ? styles.walkListItems2
                          : styles.walkListItems
                      }
                      onPress={() => {
                        setWalkData(walk);
                        setHandleListColour(walk.walkId);
                      }}
                    >
                      <View style={styles.walk_img_contain}>
                        <Image
                          style={styles.tinyLogo}
                          source={{
                            uri: `${dogObject[walk.userId][walk.dogId].imageUrl}`,
                          }}
                        />
                      </View>
                      <View style={styles.walk_text_contain}>
                        <Text style={styles.dog_name}>
                          {dogObject[walk.userId][walk.dogId].name}
                        </Text>
                        <Text style={styles.boldText}>
                          {`${parsedDate.getDate()}/${parsedDate.getMonth()}/${parsedDate.getFullYear()}, ${parsedDate.getHours()}:${parsedDate.getMinutes()}`}
                        </Text>

                        <Text style={styles.boldText}>{walk.postCode}</Text>

                        <Text style={styles.boldText}>{walk.walkMinutes} minutes long</Text>

                        <Text style={styles.boldText}>
                          {dogObject[walk.userId][walk.dogId].size} size
                        </Text>
                        <Text
                          style={styles.more_info}
                          onPress={() =>
                            navigation.navigate('SingleWalkPage', {
                              chosenWalk: walk,
                              dog: dogObject[walk.userId][walk.dogId],
                            })
                          }
                        >
                          More info...
                        </Text>

                        {/* display dog picture */}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <Nav navigation={navigation} />
      </>
    );
  }
}
