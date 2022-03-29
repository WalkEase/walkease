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
    width: '90%',
    height: Dimensions.get('window').height,
    flex: 1,
    marginTop: 15,
  },
  tempBottomNav: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#386641',
    paddingVertical: 2,
  },

  scrollView: {
    width: '100%',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,

    width: '75%',
    borderTopWidth: 3,
    borderTopColor: '#bc474995',
    marginVertical: 0,
  },
  walkListItems2: {
    backgroundColor: '#e6f2e8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    borderBottomWidth: 3,
    borderBottomColor: '#386641',
    marginVertical: 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  main_container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '95%',
  },
  walk_card: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  header_contain: {
    marginTop: 20,
    marginBottom: 5,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
  },
  header_list_contain: {
    marginTop: 20,
    width: '75%',
  },

  header: {
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
  },
  header_list: {
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.85,
    color: '#386641',
    paddingBottom: 10,
  },
  dog_name: {
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
    paddingVertical: 2,
  },
  more_info: {
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.85,
    color: '#bc4749',
  },
  walk_img_contain: {
    display: 'flex',
    justifyContent: 'center',
  },
});
