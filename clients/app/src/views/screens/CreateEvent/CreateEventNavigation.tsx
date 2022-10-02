import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvent from './screens/CreateEvent';
import SelectMatch from './screens/SelectMatch';
import { IScreenType, ICreateEventNavigationProps } from './types';

const Stack = createNativeStackNavigator();

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

const CreateEventNavigation: React.FC<ICreateEventNavigationProps> = ({ route }) => {
  const matchId = route?.params?.matchId || null;
  const tabName = route?.params?.tabName || null;

  return (
    <Stack.Navigator
      initialRouteName={`${tabName}:CreateEvent`}
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(item => (
        <Stack.Screen
          key={`${tabName}:${item.name}`}
          name={`${tabName}:${item.name}`}
          component={item.component}
          initialParams={{ tabName, matchId }}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default React.memo<ICreateEventNavigationProps>(CreateEventNavigation);
