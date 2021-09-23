import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens from './searchScreens';

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.search.name}>
      <Stack.Screen
        name={screens.search.name}
        component={screens.search.component}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
