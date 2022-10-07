import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createEventScreens } from 'views/navigation/screens';
import { ICreateEventNavigationProps } from './types';

const Stack = createNativeStackNavigator();

const CreateEventNavigation: React.FC<ICreateEventNavigationProps> = ({ route }) => {
  const matchId = route?.params?.matchId || null;
  const tabName = route?.params?.tabName || null;

  const screens = React.useMemo(() => Object.values(createEventScreens), []);

  return (
    <Stack.Navigator
      initialRouteName={`${tabName}:${createEventScreens.createEvent.name}`}
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
