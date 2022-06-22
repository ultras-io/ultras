import React from 'react';
import { StatusBar } from 'react-native';
import { Box } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initStore, { IState } from 'stores/authentication';
import initRegistrationStore, { IState as IRegistrationState } from 'stores/registration';
import { useTheme } from 'themes';
import SplashScreen from 'views/screens/Splash';
import { rootScreens } from './screens';

const Stack = createNativeStackNavigator();

interface IRootNavigationProps {}

const RootNavigation: React.FC<IRootNavigationProps> = () => {
  const useAuthenticationStore = initStore();
  const useRegistrationStore = initRegistrationStore();

  const isLoading = useAuthenticationStore((state: IState) => state.isLoading);
  const isAuthenticated = useAuthenticationStore(
    (state: IState) => state.isAuthenticated
  );
  const clearStore = useRegistrationStore(
    (state: IRegistrationState) => state.clearStore
  );

  const { colors, isDarkMode } = useTheme();

  React.useEffect(() => {
    if (isAuthenticated) {
      clearStore();
    }
  }, [isAuthenticated, clearStore]);

  if (isLoading) {
    return <SplashScreen useStore={useAuthenticationStore} />;
  }

  return (
    <>
      <StatusBar
        barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={colors.backgroundMain}
      />

      <Box flex={1}>
        <Stack.Navigator
          initialRouteName={rootScreens.intro.name}
          // initialRouteName={rootScreens.joinUs.name}
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.backgroundMain,
            },
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen
              name={rootScreens.tabNavigation.name}
              component={rootScreens.tabNavigation.component!}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen
                name={rootScreens.intro.name}
                component={rootScreens.intro.component!}
              />
              <Stack.Screen
                name={rootScreens.privacy.name}
                component={rootScreens.privacy.component}
                options={rootScreens.privacy.options}
              />
              <Stack.Screen
                name={rootScreens.joinUs.name}
                component={rootScreens.joinUs.component!}
                options={rootScreens.joinUs.options}
              />
            </Stack.Group>
          )}
          <Stack.Screen
            name={rootScreens.searchListModal.name}
            component={rootScreens.searchListModal.component!}
            options={rootScreens.searchListModal.options}
          />
        </Stack.Navigator>
      </Box>
    </>
  );
};

export default React.memo<IRootNavigationProps>(RootNavigation);
