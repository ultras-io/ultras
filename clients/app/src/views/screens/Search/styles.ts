import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  searchRow: {
    paddingHorizontal: 15,
    marginTop: Platform.select({
      android: 15,
    }),
  },
});
