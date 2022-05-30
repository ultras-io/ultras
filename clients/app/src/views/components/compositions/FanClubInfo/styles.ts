import { StyleSheet } from 'react-native';

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
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 20,
    marginBottom: 4,
    letterSpacing: -0.24,
  },
  badge: {
    marginLeft: 4,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
  },

  joinButton: {
    width: '80%',
    marginTop: 5,
  },
});
