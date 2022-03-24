import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    maxHeight: '50%',
  },

  main_contain: {
    height: '100%',
    flex: 1,
    alignContent: 'space-around',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  login_inputs_container: {
    color: '#386641',
    borderColor: '#386641',
    borderWidth: 3,
    width: '60%',
    padding: 5,
    borderRadius: 5,
  },
  login_input: {
    padding: 5,
  },
  login_button: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    color: '#386641',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
