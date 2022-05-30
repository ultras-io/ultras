import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 60,
  },
  logoWithTime: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 4,
  },
  logoContainer: {
    width: 20,
    height: 20,
    padding: 2,
    borderRadius: 3,
  },
  logo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  dateTime: {
    marginLeft: 4,
  },
});
