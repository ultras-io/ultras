import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  step: {
    marginVertical: 10,
  },
  action: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
  },
  actionText: {
    margin: 6.5,
  },
  actionSubText: {
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-end',
    width: '60%',
    marginRight: 20,
    paddingHorizontal: 5,
    marginTop: 5,
    textAlign: 'right',
  },
  rightMessage: {
    alignSelf: 'flex-end',
    width: '60%',
    marginRight: 20,
    marginBottom: 20,
  },
  phoneConfirm: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  avatar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  messageWithAvatar: {
    marginLeft: 36,
    marginVertical: 10,
  },
  messageActionLeft: {
    alignItems: 'flex-start',
  },
  messageActionRight: {
    alignItems: 'flex-end',
  },
});
