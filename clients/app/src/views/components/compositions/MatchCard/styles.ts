import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 13,
  },
  containerH: {
    marginLeft: 15,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 13,
    width: 240,
  },
  league: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginHorizontal: 5,
  },
  leagueText: {
    fontSize: 11,
    lineHeight: 13,
  },
  logoAndTime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  logoContainer: {
    width: 30,
    height: 30,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer2: {
    marginRight: 7,
  },
  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  teamAndScore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2.5,
  },
  team: {
    flex: 1,
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: -0.24,
  },
  actionBox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 15,
    right: 15,
  },
  comments: {
    marginTop: 5,
    marginLeft: 15,
  },
});
