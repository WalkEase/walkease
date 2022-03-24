import { Text, View, Image } from 'react-native';
import styles from './styles';

export default Header = () => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_text}>WalkEase</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Nicolas_Cage_-_KirkWeaver.jpg/1200px-Nicolas_Cage_-_KirkWeaver.jpg',
        }}
      />
    </View>
  );
};
