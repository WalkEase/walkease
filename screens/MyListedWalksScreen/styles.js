import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main_container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '95%',
  },

  header_contain: {
    marginTop: 60,
    width: '70%',
  },

  header: {
    fontSize: 25,
    fontWeight: '700',
    color: '#386641',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    fontSize: 18,
    height: 44,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: 'blue',
  },
  img_text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    width: '100%',
    height: '80%',
  },

  walk_card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '70%',
    // borderBottomWidth: 3,
    // borderBottomColor: '#bc474995',
    borderTopWidth: 3,
    borderTopColor: '#bc474995',
    height: 160,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
  },
  scroll_view: {
    backgroundColor: 'white',
    height: '100%',
  },
  save_press: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#38664195',
    backgroundColor: '#386641',
    borderWidth: 2,
    padding: 2,
    width: 110,
  },
  cancel_press: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bc4749',
    borderColor: '#bc474995',
    borderWidth: 2,
    width: 25,
    padding: 2,
  },
  cancel_save_text: {
    color: 'white',
    fontWeight: '700',
  },
  save_cancel: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '20%',
    paddingHorizontal: 15,
  },
  dog_name: {
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
    paddingVertical: 2,
  },
  walk_info: {
    fontSize: 15,
    fontWeight: '600',
    color: '#386641',
    paddingVertical: 2,
  },
  more_info: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.85,
    color: '#bc4749',
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
