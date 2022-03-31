import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  nav_container: {
    width: '100%',
    height: '8%',
    backgroundColor: '#386641',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nav_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  map_img: {
    width: 15,
    height: 15,
  },
  home_container: {
    width: '57%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back_container: {
    paddingLeft: 10,
    width: '43%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back_text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
