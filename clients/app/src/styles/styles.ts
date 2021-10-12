import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  appContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  containerBg: {
    flex: 1,
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 32,
    flex: 1,
  },

  headerLogo: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 25,
    flex: 1,
    letterSpacing: -0.24,
  },

  screenTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 19,
    flex: 1,
    letterSpacing: -0.24,
  },
});
