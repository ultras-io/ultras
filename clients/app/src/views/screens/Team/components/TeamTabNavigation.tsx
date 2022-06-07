import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'themes';
import Container from 'views/components/base/Container';
import { teamTabScreens } from 'views/navigation/screens';
import { ITeamTabNavigationProps } from 'views/navigation/types';

const MatchesContainer = React.lazy(
  () => import('views/screens/Matches/containers/MatchesContainer')
);
const EventsContainer = React.lazy(
  () => import('views/screens/Events/containers/EventsContainer')
);

const TopTab = createMaterialTopTabNavigator();
const TAB_NAME = 'TeamTabs';

const TeamTabNavigation: React.FC<ITeamTabNavigationProps> = ({ tabName, id }) => {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      initialRouteName={`${TAB_NAME}:${teamTabScreens.matches.name}`}
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
        name={`${TAB_NAME}:${teamTabScreens.matches.name}`}
        initialParams={{ tabName, teamId: id }}
        options={{ tabBarLabel: teamTabScreens.matches.tabName }}
      >
        {props => (
          <Container withSuspense>
            <MatchesContainer {...props} />
          </Container>
        )}
      </TopTab.Screen>

      <TopTab.Screen
        name={`${TAB_NAME}:${teamTabScreens.events.name}`}
        initialParams={{ tabName }}
        options={{ tabBarLabel: teamTabScreens.events.tabName }}
      >
        {props => (
          <Container withSuspense>
            <EventsContainer {...props} />
          </Container>
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default React.memo<ITeamTabNavigationProps>(TeamTabNavigation);
