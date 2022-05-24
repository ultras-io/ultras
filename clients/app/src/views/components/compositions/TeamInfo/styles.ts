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
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 4,
    letterSpacing: -0.24,
  },
  joinButton: {
    width: '80%',
    marginTop: 20,
  },
});
