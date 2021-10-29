import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  appContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  containerBg: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    flex: 1,
  },

  headerLogo: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    flex: 1,
    letterSpacing: -0.24,
  },

  screenTitle: {
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 19,
    flex: 1,
  },
});
