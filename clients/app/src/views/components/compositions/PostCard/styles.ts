import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 13,
  },
  date: {
    fontSize: 12,
    lineHeight: 14,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    marginTop: 6,
    marginBottom: 12,
  },

  creatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  creator: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: -0.24,
  },

  bold: {
    fontWeight: 'bold',
  },
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likeAndComment: {
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  like: {
    marginRight: 15,
  },
  arrow: {
    marginLeft: 'auto',
  },
});
