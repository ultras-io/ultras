import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 10,
    paddingRight: 20,
  },
  inputBorder: {
    borderWidth: 0.5,
  },
  inputSelect: {},
  icon: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{translateY: -6}],
  },
});
