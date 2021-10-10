import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';

import SplashScreen from 'views/screens/Splash';
import screens from './rootScreens';

const Stack = createNativeStackNavigator();

interface IRootNavigationProps {
  theme?: ThemeInterface;
}

const RootNavigation: React.FC<IRootNavigationProps> = ({theme}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated] = useState<boolean>(true);

  if (!isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={screens.intro.name}
      screenOptions={{
        headerStyle: {backgroundColor: theme?.colors.backgroundColor},
        headerShown: false,
      }}>
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
            options={screens.joinUs.options}
          />
        </Stack.Group>
      )}
      <Stack.Screen
        name={screens.searchListModal.name}
        component={screens.searchListModal.component}
        options={screens.searchListModal.options}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IRootNavigationProps>(withTheme(RootNavigation));
