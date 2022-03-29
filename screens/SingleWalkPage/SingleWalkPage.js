import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function SingleWalkPage({ route }) {
  const { chosenWalk } = route.params;
  const { dog } = route.params;

  console.log(dog);
  return (
    <View>
      <Text>
        <Text style={styles.boldText}>Date and time: </Text>
        <Text> {chosenWalk.dateTime}</Text>
        <Text style={styles.boldText}>Post code: </Text> <Text>{chosenWalk.postCode}</Text>
        <Text style={styles.boldText}>Walk time: minutes long</Text>
        {chosenWalk.walkMinutes} min
        <Text style={styles.boldText}>Walk description: </Text>
        {chosenWalk.walkDesc}
        <Text style={styles.boldText}>Walk requirements: </Text>
        {chosenWalk.walkRequirements}
        <Text style={styles.boldText}>dog birthday: </Text> {dog.dateOfBirth}
        <Text style={styles.boldText}>dog info: </Text>
        {dog.dogBio}
        <Text style={styles.boldText}>dog name:</Text> {dog.name}
        <Text style={styles.boldText}>dog size: </Text>
        {dog.size}
      </Text>
    </View>
  );
}

export default SingleWalkPage;
