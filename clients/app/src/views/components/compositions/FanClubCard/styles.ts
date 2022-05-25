import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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

  // horizontal
  containerH: {
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  avatarH: {
    marginBottom: 8,
  },
  nameH: {
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
  },
  ultrasCountH: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
  },

  small: {
    width: 60,
  },
  default: {
    width: 80,
  },
  big: {
    width: 100,
  },
  extraBig: {
    width: 140,
  },
});
