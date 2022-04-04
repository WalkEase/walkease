import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  main_container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  no_dog_container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  header: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.85,
    color: '#386641',
    borderRadius: 10,
  },

  sectionHeader: {
    fontWeight: 'bold',
  },

  item_name: {
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
  },

  item_info: {
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: '700',
    color: '#386641',
  },

  header_info_map: {
    marginVertical: 10,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginRight: 20,
  },
  buttons_contain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  list_walk: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '35%',
    color: 'white',
    backgroundColor: '#386641',
    textAlign: 'center',
  },
  addDog: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '35%',
    color: 'white',
    backgroundColor: '#386641',
    textAlign: 'center',
  },

  edit: {
    fontSize: 16,
    width: '95%',
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',

    marginBottom: 5,
  },
  dog_card: {
    width: '90%',
    marginVertical: 20,
    borderBottomColor: '#bc474995',
    borderBottomWidth: 2,
  },
  scroll_view: {
    width: '100%',
  },

  img_info_contain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
