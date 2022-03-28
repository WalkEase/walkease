import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import Nav from '../../components/Nav/Nav';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { database } from '../../firebase';
import { onValue, ref } from 'firebase/database';

function MyListedWalksScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [walks, setWalks] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(database, `data/walks/${user.uid}`), (res) => {
      setWalks(res.val());

      setIsLoading(false);
    });
  }, []);

  const walksArray = walks !== null ? Object.keys(walks) : [];
  const walkSections = walksArray.map((walk) => {
    return {
      title: walk,
      data: [walks[walk].walkDesc, walks[walk].walkMinutes, walks[walk].dateTime],
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLVLnCwenBsArkSI8m3-qSxmFBBgGlooGig&usqp=CAU',
    };
  });

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (walkSections.length === 0)
    return (
      <View style={styles.no_dog_container}>
        <Text> You have no dogs added</Text>

        {/* <Button
            style={styles.addWalk} accessibilityLabel="add-walk-button" onPress={handleAddDog}>
            Add Dog
          </Button> */}
      </View>
    );
  return (
    <>
      <View style={styles.main_container}>
        <FlatList
          data={walkSections}
          renderItem={({ item }) => (
            <View>
              <ScrollView>
                <Text style={styles.item}>{item.title + ' - ' + item.data[0]}</Text>
                <Image source={{ uri: item.image }} style={styles.img} />
                {/* <Button
                style={styles.edit}
                onPress={() => { navigation.navigate('SingleDogScreen', { name: item.title, image: item.image, info: item.data }); }}>
                Edit
              </Button> */}
              </ScrollView>
            </View>
          )}
        />
      </View>
      <Nav />
    </>
  );
}

export default MyListedWalksScreen;
