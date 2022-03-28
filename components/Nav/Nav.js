import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import styles from './styles';
import UserContext from '../../contexts/UserContext';

export default function Nav({ navigation }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.nav_container}>
      <View style={styles.back_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.map_img}
            source={require('../../assets/back-arrow.png')}
            title="Go back"
          />
        </TouchableOpacity>
        {/* <Text style={styles.back_text}>Back</Text> */}
      </View>

      <View style={styles.home_container}>
        <Text
          style={styles.nav_text}
          onPress={() => {
            navigation.navigate(`${user.userType}LandingScreen`);
          }}
        >
          Home
        </Text>
      </View>
    </View>
  );
}
