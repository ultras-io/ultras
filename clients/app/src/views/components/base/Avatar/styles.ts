import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
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
    width: 54,
    height: 54,
    borderRadius: 26,
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
