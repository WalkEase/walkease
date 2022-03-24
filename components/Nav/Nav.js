import { Text, View } from 'react-native';
import { useContext } from 'react';
import styles from './styles';
import UserContext from '../../contexts/UserContext';

export default function Nav({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.nav_container}>
      <Text
        style={styles.nav_text}
        onPress={() => {
          navigation.navigate(`${user.userType}LandingScreen`);
        }}
      >
        Home
      </Text>
    </View>
  );
}
