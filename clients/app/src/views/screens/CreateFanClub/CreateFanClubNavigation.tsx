import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createFanClubScreens } from 'views/navigation/screens';
import { ICreateFanClubNavigationProps } from './types';

const Stack = createNativeStackNavigator();

const CreateFanClubNavigation: React.FC<ICreateFanClubNavigationProps> = ({ route }) => {
  const teamId = route?.params?.teamId || null;
  const tabName = route?.params?.tabName || null;

  const screens = React.useMemo(() => Object.values(createFanClubScreens), []);

  return (
    <Stack.Navigator
      initialRouteName={`${tabName}:${createFanClubScreens.createFanClub.name}`}
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(item => (
        <Stack.Screen
          key={`${tabName}:${item.name}`}
          name={`${tabName}:${item.name}`}
          component={item.component}
          initialParams={{ tabName, teamId }}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default React.memo<ICreateFanClubNavigationProps>(CreateFanClubNavigation);
