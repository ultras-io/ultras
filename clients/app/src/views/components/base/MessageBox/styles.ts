import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    maxWidth: '80%',
    borderRadius: 15,
  },
  left: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  right: {
    marginRight: 20,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
});
