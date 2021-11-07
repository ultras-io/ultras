import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    letterSpacing: -0.24,
    marginLeft: 20,
    marginVertical: 15,
  },
  flatList: {
    paddingHorizontal: 8,
  },
  container: {
    width: 80,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 8,
  },
  name: {
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
  },
});
