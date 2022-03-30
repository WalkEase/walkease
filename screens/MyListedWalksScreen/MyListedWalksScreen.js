import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, Image, ScrollView } from 'react-native';
import Nav from '../../components/Nav/Nav';
import UserContext from '../../contexts/UserContext';
import styles from './styles';
import { database } from '../../firebase';
import { get, onValue, ref, remove } from 'firebase/database';

function MyListedWalksScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [walks, setWalks] = useState({});
  const [dogs, setDogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDogs, setIsLoadingDogs] = useState(true);

  useEffect(() => {
    onValue(ref(database, `data/walks/${user.uid}`), (res) => {
      setWalks(res.val());
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    onValue(ref(database, `data/dogs/${user.uid}`), (res) => {
      setDogs(res.val());
      setIsLoadingDogs(false);
    });
  }, []);

  const handleClickFoundAndDelete = (walkId) => {
    remove(ref(database, `data/walks/${user.uid}/${walkId}`));
  };

  if (isLoading || isLoadingDogs)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (!walks) {
    return (
      <>
        <View style={styles.main_container}>
          <View style={styles.no_walks_container}>
            <Text style={styles.no_walks_text}>
              No walks listed! Please list a walk{' '}
              <Text
                style={styles.here_text}
                onPress={() => {
                  navigation.navigate('ListAWalkScreen');
                }}
              >
                HERE
              </Text>
            </Text>
          </View>
        </View>
        <Nav navigation={navigation} />
      </>
    );
  }

  let walksArr = Object.entries(walks);

  walksArr = walksArr.map((walk) => {
    return walk[0];
  });


  return (
    <>
      <ScrollView style={styles.scroll_view}>
        <View style={styles.main_container}>
          <View style={styles.header_contain}>
            <Text style={styles.header}>Listed walks</Text>
          </View>
          {walksArr.map((walk) => {
            return (
              <View key={walk} style={styles.walk_card}>
                <View style={styles.img_text}>
                  <View style={styles.walk_img_contain}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: dogs[walks[walk].dogId].imageUrl,
                      }}
                    />
                  </View>
                  <View style={styles.walk_text_contain}>
                    <Text style={styles.dog_name}>{dogs[walks[walk].dogId].name}</Text>
                    <Text style={styles.walk_info}>{walks[walk].dateTime}</Text>
                    <Text style={styles.walk_info}>{`${walks[walk].walkMinutes} minute walk`}</Text>
                    <Text style={styles.more_info}>More info...</Text>
                  </View>
                </View>

                <View style={styles.save_cancel}>
                  <View style={styles.save_press}>
                    <Text
                      style={styles.cancel_save_text}
                      onPress={() => {
                        handleClickFoundAndDelete(walk);
                      }}
                    >
                      Walker found
                    </Text>
                  </View>
                  <View style={styles.cancel_press}>
                    <Text
                      style={styles.cancel_save_text}
                      onPress={() => {
                        handleClickFoundAndDelete(walk);
                      }}
                    >
                      X
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Nav navigation={navigation} />
    </>
  );
}

export default MyListedWalksScreen;
