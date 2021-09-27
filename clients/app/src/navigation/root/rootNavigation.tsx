import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'screens/Splash';
import screens from './rootScreens';

const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {
  const [isAppInitialised, setIsAppInitialised] = useState<boolean>(false);

  if (!isAppInitialised) {
    return <SplashScreen setIsAppInitialised={setIsAppInitialised} />;
  }

  // check auth

  return (
    <Stack.Navigator
      initialRouteName={screens.intro.name}
      screenOptions={{headerShown: false}}>
      {/* conditional rendering  */}
      {/* <Stack.Group>
        <Stack.Screen
          name={screens.intro.name}
          component={screens.intro.component}
        />
        <Stack.Screen
          name={screens.joinUs.name}
          component={screens.joinUs.component}
        />
      </Stack.Group> */}
      <Stack.Screen
        name={screens.tabNavigation.name}
        component={screens.tabNavigation.component}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
