import { Text, View } from 'react-native';
import styles from './styles';

export default ({ navigation }) => {
  return (
    <View style={styles.nav_container}>
      <Text
        style={styles.nav_text}
        onPress={() => {
          navigation.navigate('OwnerLandingScreen');
        }}
      >
        Home
      </Text>
    </View>
  );
};
