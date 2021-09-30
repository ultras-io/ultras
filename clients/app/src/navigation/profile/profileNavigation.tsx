import React, {useCallback} from 'react';
import Button from 'views/components/base/Button';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

import screens, {TAB_NAME} from './profileScreens';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToSettings = useCallback(() => {
    pushTo(screens.settings.name);
  }, [pushTo]);

  return (
    <Stack.Navigator initialRouteName={screens.profile.name}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.profile.name}`}
        component={screens.profile.component}
        initialParams={{tabName: TAB_NAME}}
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <Button onPress={navigateToSettings} title="Settings" />
          ),
        }}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.settings.name}`}
        component={screens.settings.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
