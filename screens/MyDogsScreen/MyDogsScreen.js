import { Image, Text, View, ScrollView, FlatList } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-native-button';
import UserContext from '../../contexts/UserContext';
import { database } from '../../firebase';
import Nav from '../../components/Nav/Nav';
import styles from './styles';

function MyDogsScreen({ navigation, route }) {
  const { user } = useContext(UserContext);

  const [myDogs, setMyDogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onValue(ref(database, `data/dogs/${user.uid}`), (res) => {
      setMyDogs(res.val());
      setIsLoading(false);
    });
  }, []);

  const dogsArray = myDogs !== null ? Object.keys(myDogs) : [];
  const dogSections = dogsArray.map((dog) => {
    const listId = dog;
    return {
      title: myDogs[dog].name,
      data: [myDogs[dog].size, myDogs[dog].dogBio, myDogs[dog].postCode, myDogs[dog].dateOfBirth],
      image: myDogs[dog].imageUrl,
      nameId: listId,
    };
  });

  const handleAddDog = () => {
    navigation.navigate('AddDogScreen');
  };

  const handleGoToListWalk = () => {
    navigation.navigate('ListAWalkScreen');
  };

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (dogSections.length === 0)
    return (
      <View style={styles.no_dog_container}>
        <Text style={styles.header}> You have no dogs added</Text>

        <Button style={styles.addDog} accessibilityLabel="add-dog-button" onPress={handleAddDog}>
          Add Dog
        </Button>
      </View>
    );

  return (
    <View style={styles.main_container}>
      <Text style={styles.header}>My Lovely Dogs </Text>
      <FlatList
        style={styles.sectionHeader}
        contentContainerStyle={{ alignItems: 'center' }}
        data={dogSections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dog_card}>
            <ScrollView style={styles.scroll_view}>
              <View style={styles.img_info_contain}>
                <View style={styles.dog_info}>
                  <Text style={styles.item_name}>{item.title}</Text>
                  <Text style={styles.item_info}>
                    {new Date(Date.now()).getFullYear() - new Date(item.data[3]).getFullYear()}{' '}
                    year's old
                  </Text>
                  <Text style={styles.item_info}>{item.data[0]} size</Text>
                </View>
                <View style={styles.img_contain}>
                  <Image source={{ uri: item.image }} style={styles.img} />
                </View>
              </View>
              <Text style={styles.item_info}>{item.data[1]}</Text>
            </ScrollView>
            <Text
              style={styles.edit}
              onPress={() => {
                navigation.navigate('SingleDogScreen', {
                  dog: item.nameId,
                  name: item.title,
                  image: item.image,
                  info: item.data,
                });
              }}
            >
              Edit
            </Text>
          </View>
        )}
      />
      <View style={styles.buttons_contain}>
        <Text style={styles.addDog} accessibilityLabel="add-dog-button" onPress={handleAddDog}>
          Add Dog
        </Text>

        <Text
          style={styles.list_walk}
          accessibilityLabel="list-a-walk-button"
          onPress={handleGoToListWalk}
        >
          List a Walk
        </Text>
      </View>
      <Nav navigation={navigation} />
    </View>
  );
}

export default MyDogsScreen;
