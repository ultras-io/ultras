import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'themes';
import SearchItem from 'views/components/compositions/SearchItem';
import searchTabScreens from 'views/navigation/screens/searchTabScreens';
import { ISearchTabNavigationProps } from 'views/navigation/types';

const TopTab = createMaterialTopTabNavigator();
const TAB_NAME = 'Search';

const SearchTabNavigation: React.FC<ISearchTabNavigationProps> = ({ searchText }) => {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      initialRouteName={`${TAB_NAME}:${searchTabScreens.teams.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarActiveTintColor: colors.textAction,
        tabBarIndicatorStyle: {
          backgroundColor: colors.textAction,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: colors.transparent,
      }}
    >
      <TopTab.Screen
        name={`${TAB_NAME}:${searchTabScreens.teams.name}`}
        options={{ tabBarLabel: searchTabScreens.teams.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'teams'} searchText={searchText} />}
      </TopTab.Screen>
      <TopTab.Screen
        name={`${TAB_NAME}:${searchTabScreens.fanClubs.name}`}
        options={{ tabBarLabel: searchTabScreens.fanClubs.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => (
          <SearchItem {...props} searchItem={'fanClubs'} searchText={searchText} />
        )}
      </TopTab.Screen>
      {/* <TopTab.Screen
        name={`${TAB_NAME}:${searchTabScreens.ultras.name}`}
        options={{ tabBarLabel: searchTabScreens.ultras.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'ultras'} searchText={searchText} />}
      </TopTab.Screen> */}
    </TopTab.Navigator>
  );
};

export default React.memo<ISearchTabNavigationProps>(SearchTabNavigation);
