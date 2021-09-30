import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  league: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 13,
  },
  logoAndTime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  logoContainer: {
    width: 30,
    height: 30,
    marginRight: 2,
    backgroundColor: '#fff',
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
  },
  team: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#fff',
  },
});
