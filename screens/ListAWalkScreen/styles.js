import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#718355',
  },

  main_contain: {
    height: '100%',
    flex: 1,
    alignContent: 'space-around',
    justifyContent: 'center',
  },

  login_inputs_container: {
    color: 'black',
    backgroundColor: '#718355',
    width: '60%',
    padding: 5,
    borderRadius: 5,
  },

  login_input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
  },

  login_button: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    color: 'black',
    backgroundColor: 'grey',
  },

  picker: {
    backgroundColor: 'white',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});
