import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { editProfileScreens } from 'views/navigation/screens';
import { IEditProfileNavigationProps } from './types';

const Stack = createNativeStackNavigator();

const EditProfileNavigation: React.FC<IEditProfileNavigationProps> = ({ route }) => {
  const teamId = route?.params?.teamId || null;
  const tabName = route?.params?.tabName || null;

  const screens = React.useMemo(() => Object.values(editProfileScreens), []);

  return (
    <Stack.Navigator
      initialRouteName={`${tabName}:${editProfileScreens.editProfile.name}`}
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

export default React.memo<IEditProfileNavigationProps>(EditProfileNavigation);
