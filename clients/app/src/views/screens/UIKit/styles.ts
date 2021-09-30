import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginVertical: 50,
    padding: 8,
    backgroundColor: '#535557',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    color: '#322',
  },
  section: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#444',
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
