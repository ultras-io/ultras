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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.24,
    marginTop: 6,
    marginBottom: 5,
  },

  content: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.24,
    marginTop: 5,
    marginBottom: 15,
  },

  creatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  creator: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  like: {
    marginRight: 15,
  },
  commentsText: {
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: -0.24,
    marginLeft: 5,
    marginTop: 3,
  },
  divider: {
    paddingHorizontal: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 20,
  },
  dividerH: {
    marginVertical: 5,
  },
});
