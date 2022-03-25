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


  const dogsArray = (myDogs !== null) ? Object.keys(myDogs).slice(0, -1) : [];
  const dogSections = dogsArray.map((dog) => {
    const listId = dog;
    return {
      title: myDogs[dog].name,
      data: [myDogs[dog].size, myDogs[dog].dogBio, myDogs[dog].postCode, myDogs[dog].dateOfBirth],
      image: myDogs[dog].imageUrl,
      nameId: listId
    }
  })

  const handleAddDog = () => {
    alert("Page currently not available")
  }

  const handleGoToListWalk = () => {
    navigation.navigate('ListAWalkScreen');
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
      <Header />
      <Text style={styles.header}>My Lovely Dogs  </Text>
      <FlatList
        style={styles.sectionHeader}
        data={dogSections}
        renderItem={({ item }) =>
          <View >
            <ScrollView>

              <Text style={styles.item_name}>{item.title}</Text>

              <View style={styles.header_info_map}>
                <Image style={styles.map_img} source={require('../../assets/map_icon.png')} />
                <Text style={styles.details_list_item}>{item.data[2]}</Text>

              </View>
              <Text style={styles.item_born}>Born: {item.data[3]}</Text>
              <Text style={styles.item_size}>Size :{item.data[0]}</Text>
              <Text style={styles.item_size}>Info: {item.data[1]}</Text>
              <Image source={{ uri: item.image }} style={styles.img} />

              <Button
                style={styles.edit}
                onPress={() => { navigation.navigate('SingleDogScreen', { dog: item.nameId, name: item.title, image: item.image, info: item.data }); }}>
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

      < Button
        style={styles.addDog} accessibilityLabel="add-dog-button" onPress={handleGoToListWalk} >
        Go to List Walk Page
      </Button >

      <Nav navigation={navigation} />
    </View >
  );
}

export default MyDogsScreen;
