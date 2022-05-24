import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: 213,
    resizeMode: 'cover',
  },

  container: {
    padding: 15,
    paddingLeft: 20,
  },

  date: {
    fontSize: 12,
  },

  title: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.24,
    marginTop: 6,
    marginBottom: 5,
  },
  match: {
    marginTop: 5,
  },
  location: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.24,
    marginTop: 15,
  },
  creatorContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  creator: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },

  stats: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },

  going: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },

  divider: {
    paddingHorizontal: 6,
    paddingTop: 2,
    height: 18,
  },

  actionBox: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  goingButton: {
    flex: 1,
  },
  likeButton: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dividerH: {
    marginVertical: 5,
  },
});
