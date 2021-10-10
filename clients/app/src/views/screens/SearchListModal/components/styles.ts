import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 32,
    paddingLeft: 16,
  },
  searchRow: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 13,
  },
  row: {
    paddingVertical: 14,
    paddingLeft: 5,
    marginLeft: 14,
    borderBottomWidth: 0.2,
  },
  text: {
    fontSize: 14,
  },
});
