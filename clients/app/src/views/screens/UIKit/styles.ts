import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    padding: 8,
    backgroundColor: 'rgba(39, 40, 41, 0.9)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    color: '#eee',
  },
  section: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  rowContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItem: {
    marginRight: 10,
  },
  card: {
    marginTop: 10,
    width: 100,
  },
});
