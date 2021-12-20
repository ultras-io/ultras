import {StyleSheet} from 'react-native';

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
  containerMinimal: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  avatar: {
    marginRight: 15,
  },
  username: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
});
