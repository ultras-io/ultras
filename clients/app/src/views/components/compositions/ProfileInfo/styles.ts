import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 20,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginBottom: 4,
    letterSpacing: -0.24,
  },
  username: {
    fontSize: 12,
  },
});
