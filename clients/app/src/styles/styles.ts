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

  // list footer under bottom of screen
  contentContainerStyle: {
    padding: 15,
    paddingBottom: 0,
    flexGrow: 1,
  },
  listFooterComponentStyle: {
    flex: 1,
    position: 'relative',
  },
});
