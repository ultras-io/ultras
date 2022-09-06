import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'themes';
import * as notifications from 'notifications';
import tabScreens from './screens/tabScreens';

const Tab = createBottomTabNavigator();

interface ITabNavigationProps {}

notifications.configureBackgroundMode();

const TabNavigation: React.FC<ITabNavigationProps> = () => {
  React.useEffect(() => {
    notifications.requestUserPermission().then(() => {
      notifications.sendTokenToServer();
    });

    const unsubscribe = notifications.configureInAppMode();
    return unsubscribe;
  }, []);

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={tabScreens.home.name}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundTabBar,
          borderTopColor: colors.transparent,
        },
        tabBarActiveTintColor: colors.textHeader,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarShowLabel: false,
        lazy: true,
      }}
    >
      <Tab.Screen
        name={tabScreens.home.name}
        component={tabScreens.home.component!}
        initialParams={{ tabName: tabScreens.home.name }}
        options={tabScreens.home.options}
      />
      <Tab.Screen
        name={tabScreens.search.name}
        component={tabScreens.search.component!}
        initialParams={{ tabName: tabScreens.search.name }}
        options={tabScreens.search.options}
      />
      <Tab.Screen
        name={tabScreens.matches.name}
        component={tabScreens.matches.component!}
        initialParams={{ tabName: tabScreens.matches.name }}
        options={tabScreens.matches.options}
      />
      <Tab.Screen
        name={tabScreens.events.name}
        component={tabScreens.events.component!}
        initialParams={{ tabName: tabScreens.events.name }}
        options={tabScreens.events.options}
      />
      <Tab.Screen
        name={tabScreens.profile.name}
        component={tabScreens.profile.component!}
        initialParams={{ tabName: tabScreens.profile.name }}
        options={tabScreens.profile.options}
      />
    </Tab.Navigator>
  );
};

export default React.memo<ITabNavigationProps>(TabNavigation);
