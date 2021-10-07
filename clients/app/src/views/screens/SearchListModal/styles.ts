import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  searchRow: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,.1)',
  },
  searchInput: {
    flex: 1,
  },
  cancelButton: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  row: {
    paddingVertical: 14,
    paddingLeft: 5,
    marginLeft: 14,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,.1)',
  },
  text: {
    fontSize: 14,
  },
});
