import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import {generateCommonScreens} from '../commonScreens';
import screens, {TAB_NAME} from './searchScreens';

const Stack = createNativeStackNavigator();

interface ISearchNavigationProps {
  theme?: ThemeInterface;
}

const SearchNavigation = ({theme}: ISearchNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.search.name}`}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.secondary,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.search.name}`}
        component={screens.search.component}
        initialParams={{tabName: TAB_NAME}}
        options={{headerShown: false}}
      />
      {generateCommonScreens(TAB_NAME, Stack)}
    </Stack.Navigator>
  );
};

export default React.memo<ISearchNavigationProps>(withTheme(SearchNavigation));
