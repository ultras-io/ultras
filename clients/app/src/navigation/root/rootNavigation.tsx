import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'views/screens/Splash';
import screens from './rootScreens';

const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated] = useState(false);

  if (!isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={screens.intro.name}
      screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen
          name={screens.tabNavigation.name}
          component={screens.tabNavigation.component}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={screens.intro.name}
            component={screens.intro.component}
          />
          <Stack.Screen
            name={screens.uikit.name}
            component={screens.uikit.component}
          />
          <Stack.Screen
            name={screens.joinUs.name}
            component={screens.joinUs.component}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
