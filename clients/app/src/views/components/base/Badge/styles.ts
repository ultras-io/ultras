import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    right: -3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  withContainer: {
    alignSelf: 'flex-start',
  },
  number: {
    fontWeight: '500',
  },
  // sizes
  badgeSmall: {
    minWidth: 14,
    height: 14,
    borderRadius: 7,
  },
  numberSmall: {
    fontSize: 10,
  },
  badgeDefault: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
  },
  numberDefault: {
    fontSize: 13,
  },
  badgeBig: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
  },
  numberBig: {
    fontSize: 13,
  },
});
