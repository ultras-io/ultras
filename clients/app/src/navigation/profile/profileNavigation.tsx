import React, {useCallback} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Button from 'views/components/base/Button';
import screens, {TAB_NAME} from './profileScreens';

const Stack = createNativeStackNavigator();

interface IProfileNavigationProps {
  theme?: ThemeInterface;
}

const ProfileNavigation: React.FC<IProfileNavigationProps> = ({theme}) => {
  const {pushTo} = useNavigationWithParams();

  return (
    <Stack.Navigator
      initialRouteName={screens.profile.name}
      screenOptions={{
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.text,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.profile.name}`}
        component={screens.profile.component}
        initialParams={{tabName: TAB_NAME}}
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <Button onPress={() => pushTo(screens.settings.name)} title="S" />
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

export default React.memo<IProfileNavigationProps>(
  withTheme(ProfileNavigation),
);
