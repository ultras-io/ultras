import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens, {TAB_NAME} from './searchScreens';

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.search.name}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.search.name}`}
        component={screens.search.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
