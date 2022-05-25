import { StyleSheet } from 'react-native';

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
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 32,
    flex: 1,
  },

  headerLogo: {
    marginLeft: 10,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 25,
    flex: 1,
    letterSpacing: -0.24,
  },

  screenTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 17,
    flex: 1,
    paddingRight: 120,
  },

  screenTitleLeft: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 17,
    flex: 1,
    paddingRight: 120,
    marginLeft: 10,
  },
});
