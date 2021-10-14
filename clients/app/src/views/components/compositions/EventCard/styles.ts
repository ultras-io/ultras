import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 13,
  },
  innerContainer: {
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 196,
    resizeMode: 'contain',
  },
  date: {
    fontSize: 12,
    lineHeight: 14,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: -0.24,
    marginTop: 6,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 11,
    lineHeight: 13,
  },
  location: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
    marginTop: 8,
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  comments: {
    marginRight: 15,
  },
  arrow: {
    marginLeft: 'auto',
  },
});
