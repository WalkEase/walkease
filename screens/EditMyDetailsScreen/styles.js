import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  main_container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  details_list: {
    margin: 10,
    padding: 5,
    minHeight: '70%',
    width: '80%',
    justifyContent: 'space-between',
  },
  details_list_item: {
    fontSize: 20,
    paddingVertical: 5,
    backgroundColor: 'white',
    color: '#386641',
    fontWeight: '500',
    padding: 5,
    borderRadius: 10,
  },
  details_list_name: {
    fontSize: 25,
    paddingVertical: 5,

    color: '#386641',
    fontWeight: '700',
    padding: 5,
    borderRadius: 10,
  },
  details_list_header: {
    fontSize: 15,
    fontWeight: '600',
    color: '#bc474995',
    paddingLeft: 5,
  },
  details_list_item_bio: {
    fontSize: 20,
    paddingVertical: 5,
    backgroundColor: 'white',
    color: '#386641',
    fontWeight: '500',
    padding: 5,
    borderRadius: 10,
    marginBottom: 60,
  },
  bio_scrollview: {
    backgroundColor: 'white',
  },
  header_info: {
    marginVertical: 5,
  },
  header_info_map: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  map_img: {
    width: 35,
    height: 35,
  },
  details_list_edit: {
    marginLeft: 4,
    fontSize: 20,
    fontWeight: '600',
    color: '#bc474995',
    paddingLeft: 5,
  },
  input: {
    backgroundColor: 'blue',
    width: '50%',
    paddingVertical: 5,
  },
  save_cancel: {
    marginTop: 5,
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
  },
});
