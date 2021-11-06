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
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    marginBottom: 4,
    letterSpacing: -0.24,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
  },
  divider: {
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  joinButton: {
    width: '80%',
    marginTop: 5,
  },
  dividerH: {
    marginBottom: 10,
  },
});
