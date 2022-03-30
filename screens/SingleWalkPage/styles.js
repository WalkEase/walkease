import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
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

  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#386641',
    paddingVertical: 2,
  },

  boldText_info: {
    fontSize: 15,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
    paddingTop: 10,
  },

  scrollView: {
    marginTop: 20,
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

  tinyLogo: {
    width: 110,
    height: 110,
    borderRadius: 80,
    marginRight: 30,
  },
  main_container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  header_contain: {
    marginTop: 20,
    marginBottom: 5,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
  },

  header: {
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.85,
    color: '#bc4749',
    marginTop: 20,
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
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopColor: '#bc474995',
    borderTopWidth: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  about_dog_text: {
    fontSize: 25,
    fontWeight: '700',
    opacity: 0.85,
    color: '#386641',
    textAlign: 'left',
    width: '90%',
  },
  dog_info_contain: {
    width: '90%',
    marginBottom: 20,
  },
  walk_text_contain: {
    width: '90%',

    borderTopColor: '#bc474995',
    borderTopWidth: 3,
  },
  call_button_contain: {
    width: '100%',
    alignItems: 'center',
  },
  call_button: {
    marginVertical: 20,
    color: 'white',
    fontWeight: '700',
    backgroundColor: '#386641',
    padding: 10,
  },
});
