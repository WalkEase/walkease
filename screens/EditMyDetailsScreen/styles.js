import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  main_container: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: '10%',
  },
  avatar: {
    marginTop: 30,
    width: 110,
    height: 110,
    borderRadius: 80,
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
  input_contain: {
    borderBottomColor: '#386641',
    borderBottomWidth: 2,
    width: '80%',
    marginVertical: 10,
    borderRadius: 5,
  },
  input_contain_bio: {
    maxHeight: 100,
  },
  input: {
    width: '100%',
    padding: 5,
  },
  input_bio: {
    height: 60,
  },
  save_cancel: {
    marginTop: 5,
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
  },
  edit_text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#bc4749',
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
  invalid_input: {
    opacity: 0.85,
    color: '#bc4749',
  },
  DoBContainer: {
    width: 200,
    marginVertical: 30,
  },
  subHeader: {
    fontSize: 17,
    opacity: 0.85,
    color: '#bc4749',
    fontWeight: '500',
    textAlign: 'center',
  },
  date: {
    width: '100%',
  },

  login_input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,

    borderRadius: 10,
    marginTop: 5,
    marginVertical: 5,
  },
});
