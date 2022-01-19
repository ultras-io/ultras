import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';

import SplashScreen from 'views/screens/Splash';
import screens from './screens';

const rootScreens = screens.rootScreens;

const Stack = createNativeStackNavigator();

interface IRootNavigationProps {
  theme?: ThemeInterface;
}

const RootNavigation: React.FC<IRootNavigationProps> = ({ theme }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(true);

  if (!isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={rootScreens.intro.name}
      screenOptions={{
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          name={rootScreens.tabNavigation.name}
          component={rootScreens.tabNavigation.component}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={rootScreens.intro.name}
            component={rootScreens.intro.component}
          />
          <Stack.Screen
            name={rootScreens.uikit.name}
            component={rootScreens.uikit.component}
          />
          <Stack.Screen
            name={rootScreens.joinUs.name}
            component={rootScreens.joinUs.component}
            options={rootScreens.joinUs.options}
          />
        </Stack.Group>
      )}
      <Stack.Screen
        name={rootScreens.searchListModal.name}
        component={rootScreens.searchListModal.component}
        options={rootScreens.searchListModal.options}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IRootNavigationProps>(withTheme(RootNavigation));