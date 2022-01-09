import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  team: {
    flex: 4,
    paddingTop: 10,
    alignItems: 'center',
  },
  teamName: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.24,
    marginTop: 10,
    textAlign: 'center',
  },
  info: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueLogoContainer: {
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 3,
    marginBottom: 6,
  },
  leagueLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  leagueVenueText: {
    fontSize: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 13,
    marginTop: 12,
    marginBottom: 4,
  },
  score: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.24,
    marginBottom: 4,
  },
  button: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '50%',
  },
  divider: {
    marginVertical: 15,
  },
});
