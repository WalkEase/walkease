import { Text, View } from 'react-native';
import styles from './styles';

export default Header = () => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_text}>WalkEase</Text>
    </View>
  );
};
