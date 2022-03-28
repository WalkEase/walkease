import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    maxHeight: '100%',
  },

  main_contain: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'space-around',
    backgroundColor: 'blue',
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
    textAlign: 'center',
  },
  buttons: {
    marginTop: 40,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  nav_container: {
    width: '100%',
    height: '5%',
    backgroundColor: '#386641',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
