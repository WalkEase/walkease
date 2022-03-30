import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    height: '95%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  walker_list: {
    margin: 0,
    marginTop: 0,
    padding: 5,
    minHeight: '40%',
    width: '85%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginBottom: 110,
  },
  walker_list_item: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    color: '#386641',
    opacity: 0.9,
    padding: 5,
    paddingLeft: 0,
  },
  walker_list_link_bottom_border: {
    borderBottomWidth: 3,
    borderBottomColor: '#bc474995',
    width: '90%',
  },
  avatar: {
    marginTop: 30,
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 30,
  },
  nav_container: {
    width: '100%',
    height: '5%',
    backgroundColor: '#386641',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome_name: {
    fontSize: 25,
    fontWeight: '700',
    color: '#386641',
    marginBottom: 0,
  },
  welcome_contain: {
    alignContent: 'flex-start',
    width: '87%',
    marginBottom: 0,
  },
});
