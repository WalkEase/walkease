import { Image, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect } from 'react';

import Button from 'react-native-button';

import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import styles from './styles';


function MyDogsScreen({ navigation }) {

  const { user } = useContext(UserContext);

  const [myDogs, setMyDogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    onValue(ref(database, `data/dogs/${user.uid}`), (res) => {
      setMyDogs(res.val());
      setIsLoading(false);
    });
  }, []);


  const dogsArray = (myDogs !== null) ? Object.keys(myDogs) : [];
  const dogSections = dogsArray.map((dog) => {
    return {
      title: dog,
      data: [myDogs[dog].size, myDogs[dog].dogBio, myDogs[dog].postCode],
      image: myDogs[dog].imageUrl
    }
  })


  const handleAddDog = () => {
    alert("Page currently not available")
  }

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (dogSections.length === 0)
    return (
      <View style={styles.no_dog_container}>
        <Text> You have no dogs added</Text>

        <Button
          style={styles.addDog} accessibilityLabel="add-dog-button" onPress={handleAddDog}>
          Add Dog
        </Button>

      </View>
    );

  return (
    <View style={styles.main_container}>

      <Text style={styles.header}>My Lovely Dogs  </Text>

      <FlatList
        data={dogSections}
        renderItem={({ item }) =>
          <View>
            <ScrollView>
              <Text style={styles.item}>{item.title + " - " + item.data[0]}</Text>
              <Image source={{ uri: item.image }} style={styles.img} />
              <Button
                style={styles.edit}
                onPress={() => { navigation.navigate('SingleDogScreen', { name: item.title, image: item.image, info: item.data }); }}>
                Edit
              </Button>
            </ScrollView>
          </View>

        }
      />

      < Button
        style={styles.addDog} accessibilityLabel="add-dog-button" onPress={handleAddDog} >
        Add Dog
      </Button >

    </View >
  );
}

export default MyDogsScreen;
