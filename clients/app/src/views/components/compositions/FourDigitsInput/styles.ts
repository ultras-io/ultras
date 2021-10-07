import {StyleSheet} from 'react-native';

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
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 12,
    paddingRight: 0,
  },
});
