import React, { ComponentType } from 'react';
import { ThemeInterface } from 'styled-components';
import { ScreenProps } from 'react-native-screens';

export type CommonScreens = Record<
  | 'match'
  | 'event'
  | 'post'
  | 'team'
  | 'supportersClub'
  | 'supportersClubAbout'
  | 'profile'
  | 'newEvent'
  | 'profileList',
  {
    name:
      | 'Match'
      | 'Event'
      | 'Post'
      | 'Team'
      | 'SupportersClub'
      | 'SupportersClubAbout'
      | 'Profile'
      | 'NewEvent'
      | 'ProfileList';
    component: React.FC<any>;
    headerTitle?: React.FunctionComponent<any>;
    isModal?: boolean;
    headerShown?: boolean;
  }
>;

interface ScreenOptions extends ScreenProps {
  headerTitle?: React.FunctionComponent<any>;
  tabBarIcon?: React.FunctionComponent<any>;
  isModal?: boolean;
  headerShown?: boolean;
  headerBackVisible?: boolean;
  headerShadowVisible?: boolean;
  presentation?: string;
}

export type NavigationScreen = {
  name: string;
  tabName?: string;
  component: ComponentType<any>;
  options?: ScreenOptions;
};

export type RootNavigationScreens = {
  intro: NavigationScreen;
  joinUs: NavigationScreen;
  searchListModal: NavigationScreen;
  uikit: NavigationScreen;
  tabNavigation: NavigationScreen;
};

export type TabNavigationScreens = {
  home: NavigationScreen;
  search: NavigationScreen;
  matches: NavigationScreen;
  events: NavigationScreen;
  profile: NavigationScreen;
};

export type SearchNavigationScreens = {
  search: NavigationScreen;
};

export type MatchesNavigationScreens = {
  matches: NavigationScreen;
};

export type EventsNavigationScreens = {
  events: NavigationScreen;
};

export type ProfileNavigationScreens = {
  settings: NavigationScreen;
  notifications: NavigationScreen;
};

export type SearchTabScreens = {
  all: NavigationScreen;
  team: NavigationScreen;
  supportersClubs: NavigationScreen;
  ultras: NavigationScreen;
};

export type ListModalTabScreens = {
  footballClubs: NavigationScreen;
  nationalTeams: NavigationScreen;
};

export type TeamTabScreens = {
  matches: NavigationScreen;
  events: NavigationScreen;
};

export type ScreenNavigationConfig = Record<
  string,
  {
    tabName: string;
    initialScreenName: string;
    screens: NavigationScreen[];
  }
>;

export interface ITeamTabNavigationProps {
  theme?: ThemeInterface;
  tabName: string;
}

export interface ISearchTabNavigationProps {
  searchText: string;
  theme?: ThemeInterface;
}
