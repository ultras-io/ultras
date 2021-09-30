import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: 60,
    marginTop: 8,
  },
  logoWithTime: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 3,
  },
  logo: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  dateTime: {
    marginLeft: 3,
  },
  date: {
    fontSize: 9,
    lineHeight: 9,
    fontWeight: '400',
  },
  time: {
    fontSize: 11,
    lineHeight: 12,
    fontWeight: '600',
  },
});
