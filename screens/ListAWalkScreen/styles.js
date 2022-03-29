import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  main_contain: {
    height: '100%',
    flex: 1,
    alignContent: 'space-around',
    justifyContent: 'center',
  },

  login_inputs_container: {
    color: 'black',
    width: '60%',
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },

  login_input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#386641',
    marginVertical: 5,
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
    marginTop: 0,
    width: 180,
    borderRadius: 10,
    borderColor: '#386641',
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },

  invalid_input: {
    opacity: 0.85,
    color: '#bc4749',
  },
  nav_container: {
    width: '100%',
    height: '5%',
    backgroundColor: '#386641',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
