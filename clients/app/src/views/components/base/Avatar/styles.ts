import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '65%',
    height: '65%',
  },
  small: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  default: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  big: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  extraBig: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
});
