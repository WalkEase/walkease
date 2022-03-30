import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  main_container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '95%',
  },

  login_inputs_container: {
    color: 'black',
    width: '80%',
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

  scrollView: {
    width: '100%',
    flex: 1,
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

    width: 180,
    borderRadius: 10,
    height: 140,
  },

  picker_contain: {
    marginTop: 15,
  },

  header: {
    fontSize: 25,
    paddingVertical: 5,
    opacity: 0.85,
    color: '#bc4749',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
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
  save_press: {
    display: 'flex',
    alignItems: 'center',
    borderColor: '#38664195',
    backgroundColor: '#386641',
    borderWidth: 2,
    padding: 2,
    width: 80,
  },
  cancel_press: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#bc4749',
    borderColor: '#bc474995',
    borderWidth: 2,
    width: 80,
    padding: 2,
  },
  cancel_save_text: {
    color: 'white',
    fontWeight: '700',
  },
  save_cancel: {
    marginTop: 30,
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 17,
    opacity: 0.85,
    color: '#bc4749',
    fontWeight: '500',
    textAlign: 'center',
  },
  no_walks_text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#386641',
    textAlign: 'center',
  },
  here_text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#bc4749',
  },
  no_walks_container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: '10%',
    width: '70%',
  },
});
