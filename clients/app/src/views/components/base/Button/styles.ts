import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // todo remove
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
  },
  // sizes
  buttonSizeSmall: {
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  textSizeSmall: {
    fontSize: 13,
    marginHorizontal: 2,
  },
  buttonSizeDefault: {
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  textSizeDefault: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    marginHorizontal: 4,
  },
  buttonSizeBig: {
    height: 50,
    paddingHorizontal: 13,
    borderRadius: 13,
  },
  textSizeBig: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    marginHorizontal: 6,
  },
  // colors
  buttonColorPrimary: {
    backgroundColor: '#AB9760',
    borderColor: '#AB9760',
  },
  textColorPrimary: {
    color: '#fff',
  },
  buttonColorSecondary: {
    backgroundColor: '#535557',
    borderColor: '#535557',
  },
  textColorSecondary: {
    color: '#fff',
  },
  buttonColorDefault: {
    backgroundColor: '#47C471',
    borderColor: '#47C471',
  },
  textColorDefault: {
    color: '#fff',
  },
  buttonColorDanger: {
    backgroundColor: '#E64D00',
    borderColor: '#E64D00',
  },
  textColorDanger: {
    color: '#fff',
  },

  // appearance
  buttonAppearanceMinimal: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  textAppearanceMinimal: {
    color: '#000',
  },
  buttonAppearanceOutline: {
    backgroundColor: 'transparent',
  },
  textAppearanceOutline: {
    color: '#000',
  },
  buttonAppearanceDefault: {},
  textAppearanceDefault: {},

  // icon
  iconRight: {
    marginLeft: 4,
  },
  iconLeft: {
    marginRight: 4,
  },
});
