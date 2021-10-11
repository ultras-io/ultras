import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 13,
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 15,
  },
  name: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 4,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
  },
  divider: {
    marginHorizontal: 6,
    justifyContent: 'center',
  },
});
