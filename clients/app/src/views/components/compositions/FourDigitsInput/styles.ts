import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'baseline',
    padding: 15,
    paddingRight: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
  },
  inputs: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: 44,
    marginRight: 10,
  },
  input: {
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 30,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    textAlign: 'center',
  },
});
