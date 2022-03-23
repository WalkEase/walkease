import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  tempHeader: {
    marginBottom: 20,
    backgroundColor: 'lightblue',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  tempBottomNav: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
  },
});
