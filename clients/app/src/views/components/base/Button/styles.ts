import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  icon: {
    // marginHorizontal: 2,
  },
  text: {
    textAlign: 'center',
  },

  underlined: {
    textDecorationLine: 'underline',
  },

  // text Size
  textSizeSmall: {
    fontSize: 11,
    marginHorizontal: 2,
  },
  textSizeDefault: {
    fontSize: 14,
    marginHorizontal: 4,
    fontWeight: '600',
  },
  textSizeBig: {
    fontSize: 17,
    marginHorizontal: 5,
    fontWeight: '600',
  },

  // sizes
  buttonSizeSmall: {
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  buttonSizeDefault: {
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  buttonSizeBig: {
    height: 50,
    paddingHorizontal: 13,
    borderRadius: 13,
  },

  noPadding: {
    paddingHorizontal: 0,
  },

  // boxSize
  buttonBoxSizeCover: {},
  buttonBoxSizeContain: {
    alignSelf: 'flex-start',
  },
});
