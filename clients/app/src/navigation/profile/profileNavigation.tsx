import React, {useCallback} from 'react';
import {Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import screens from './profileScreens';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  const navigation = useNavigation<any>();

  const navigateToSettings = useCallback(() => {
    navigation.navigate(screens.settings.name);
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName={screens.profile.name}>
      <Stack.Screen
        name={screens.profile.name}
        component={screens.profile.component}
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <Button onPress={navigateToSettings} title="Settings" />
          ),
        }}
      />
      <Stack.Screen
        name={screens.settings.name}
        component={screens.settings.component}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
