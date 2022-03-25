import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  main_container: {
    height: '83%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  walker_list: {
    margin: 10,
    padding: 5,
    minHeight: '40%',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  walker_list_item: {
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
    width: 100,
    height: 100,
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
    padding: 5,
    color: '#386641',
    marginBottom: 20,
  },
  welcome_contain: {
    alignContent: 'flex-start',
    width: '87%',
  },
});
