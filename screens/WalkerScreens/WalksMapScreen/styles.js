import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  tempHeader: {
    marginBottom: 20,
    backgroundColor: 'lightblue',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
  tempBottomNav: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },

  scrollView: {
    flex: 1,
  },

  walkListTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  walkListItems: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 10,

    borderBottomWidth: 2,
    borderBottomColor: '#386641',
    marginVertical: 5,
  },
  walkListItems2: {
    backgroundColor: '#e6f2e8',
    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 10,

    borderBottomWidth: 2,
    borderBottomColor: '#386641',
    marginVertical: 5,
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
