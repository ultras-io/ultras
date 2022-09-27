import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvent from './screens/CreateEvent';
import SelectMatch from './screens/SelectMatch';
import { IScreenType } from './types';

const Stack = createNativeStackNavigator();

interface ICreateEventNavigationProps {
  tabName?: null | string;
  matchId?: null | ResourceIdentifier;
}

const currentTabName = 'CreateEvent';

// order is important !!!
const screens: Array<IScreenType> = [
  {
    name: 'CreateEvent',
    component: CreateEvent,
  },
  {
    name: 'SelectMatch',
    component: SelectMatch,
  },
];

const CreateEventNavigation: React.FC<ICreateEventNavigationProps> = ({
  tabName,
  matchId,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${currentTabName}:${screens[0].name}`}
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(item => (
        <Stack.Screen
          key={`${currentTabName}:${item.name}`}
          name={`${currentTabName}:${item.name}`}
          component={item.component}
          initialParams={{ tabName, matchId }}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default React.memo<ICreateEventNavigationProps>(CreateEventNavigation);
