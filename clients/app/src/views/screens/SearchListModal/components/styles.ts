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
    // flex: 1,
    // marginHorizontal: 15,
    // borderRadius: 13,
  },
  row: {
    marginHorizontal: 15,
    paddingLeft: 15,
  },
  firstRow: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  lastRow: {
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  borderedRow: {
    paddingVertical: 14,
    borderBottomWidth: 0.2,
  },
  lastBorderedRow: {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: 14,
  },
  footerText: {
    fontSize: 12,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
});
