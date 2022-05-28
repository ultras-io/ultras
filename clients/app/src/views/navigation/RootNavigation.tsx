import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import styles from './styles';

import Box from 'views/components/base/Box';
import SplashScreen from 'views/screens/Splash';
import Loader from 'views/screens/Loader';
import { rootScreens } from './screens';

const Stack = createNativeStackNavigator();

interface IRootNavigationProps {}

const RootNavigation: React.FC<IRootNavigationProps> = () => {
  const { colors, isDarkMode } = useTheme();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAuthenticated] = React.useState<boolean>(
    true
    // false
  );

  if (!isLoading) {
    return (
      <>
        <StatusBar hidden={true} />
        <SplashScreen setIsLoading={setIsLoading} />
      </>
    );
  }
  // console.log(JSON.stringify(rootScreens, null, 2));

  return (
    <React.Suspense fallback={<Loader />}>
      <StatusBar
        barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={colors.headerBackground}
      />

      <Box bgColor="screenBackground" style={styles.app}>
        <Stack.Navigator
          // initialRouteName={rootScreens.intro.name}
          initialRouteName={rootScreens.joinUs.name}
          screenOptions={{
            headerShown: false,
            headerStyle: Platform.select({
              android: {
                backgroundColor: colors.headerBackground,
              },
              ios: {
                backgroundColor: colors.transparent,
              },
            }),
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
      </Box>
    </React.Suspense>
  );
};

export default React.memo<IRootNavigationProps>(RootNavigation);
