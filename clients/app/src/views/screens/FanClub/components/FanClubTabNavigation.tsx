import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'themes';
import Container from 'views/components/base/Container';
import { fanClubTabScreens } from 'views/navigation/screens';
import { IFanClubTabNavigationProps } from 'views/navigation/types';

const RoomsContainer = React.lazy(() => import('../containers/RoomsContainer'));
const EventsContainer = React.lazy(
  () => import('views/screens/Events/containers/EventsContainer')
);

const TopTab = createMaterialTopTabNavigator();
const TAB_NAME = 'FanClubTabs';

const FanClubTabNavigation: React.FC<IFanClubTabNavigationProps> = ({ tabName, id }) => {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      initialRouteName={`${TAB_NAME}:${fanClubTabScreens.rooms.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: colors.transparent },
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarActiveTintColor: colors.textAction,
        tabBarIndicatorStyle: {
          backgroundColor: colors.textAction,
        },
        lazy: true,
      }}
      sceneContainerStyle={{
        backgroundColor: colors.transparent,
      }}
    >
      <TopTab.Screen
        name={`${TAB_NAME}:${fanClubTabScreens.rooms.name}`}
        initialParams={{ tabName, fanClubId: id }}
        options={{ tabBarLabel: fanClubTabScreens.rooms.tabName }}
      >
        {props => (
          <Container withSuspense>
            <RoomsContainer fanClubId={id} {...props} />
          </Container>
        )}
      </TopTab.Screen>

      <TopTab.Screen
        name={`${TAB_NAME}:${fanClubTabScreens.events.name}`}
        initialParams={{ tabName }}
        options={{ tabBarLabel: fanClubTabScreens.events.tabName }}
      >
        {props => (
          <Container withSuspense>
            <EventsContainer fanClubId={id} {...props} />
          </Container>
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default React.memo<IFanClubTabNavigationProps>(FanClubTabNavigation);
