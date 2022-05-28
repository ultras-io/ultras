import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';

import SplashScreen from 'views/screens/Splash';
import { rootScreens } from './screens';

const Stack = createNativeStackNavigator();

interface IRootNavigationProps {}

const RootNavigation: React.FC<IRootNavigationProps> = () => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(
    true
    // false
  );

  if (!isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }
  // console.log(JSON.stringify(rootScreens, null, 2));

  return (
    <Stack.Navigator
      // initialRouteName={rootScreens.intro.name}
      initialRouteName={rootScreens.joinUs.name}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
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

export default React.memo<IRootNavigationProps>(RootNavigation);
