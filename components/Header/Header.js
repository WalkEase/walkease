import { Text, View, Image } from 'react-native';
import styles from './styles';

export default Header = () => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_text}>WalkEase</Text>
      <Image style={styles.map_img} source={require('../../assets/dogIcon.png')} />
    </View>
  );
};
