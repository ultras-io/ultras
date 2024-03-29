import React, { ComponentType } from 'react';
import { ScreenProps } from 'react-native-screens';
import { ResourceIdentifier } from '@ultras/core-api-sdk';

export type CommonScreens = Record<
  | 'match'
  | 'event'
  | 'post'
  | 'team'
  | 'fanClub'
  | 'fanClubAbout'
  | 'profile'
  | 'createEvent'
  | 'createFanClub'
  | 'profileList'
  | 'notifications'
  | 'room',
  {
    name:
      | 'Match'
      | 'Event'
      | 'Post'
      | 'Team'
      | 'FanClub'
      | 'FanClubAbout'
      | 'Profile'
      | 'CreateEvent'
      | 'CreateFanClub'
      | 'ProfileList'
      | 'Notifications'
      | 'Room';
    component: React.FC<any>;
    options?: ScreenOptions;
  }
>;

interface ScreenOptions extends ScreenProps {
  headerTitle?: string | React.FunctionComponent<any>;
  tabBarIcon?: React.FunctionComponent<any>;
  tabBarBadge?: string;
  isModal?: boolean;
  headerShown?: boolean;
  headerBackVisible?: boolean;
  headerShadowVisible?: boolean;
  presentation?: string;
}

export type NavigationScreen = {
  name: string;
  tabName?: string;
  component?: ComponentType<any>;
  options?: ScreenOptions;
};

export type RootNavigationScreens = {
  intro: NavigationScreen;
  joinUs: NavigationScreen;
  searchListModal: NavigationScreen;
  privacy: NavigationScreen;
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
  editProfile: NavigationScreen;
};

export type SearchTabScreens = {
  // all: NavigationScreen;
  teams: NavigationScreen;
  fanClubs: NavigationScreen;
  // ultras: NavigationScreen;
};

export type TeamTabScreens = {
  matches: NavigationScreen;
  events: NavigationScreen;
};

export type FanClubTabScreens = {
  rooms: NavigationScreen;
  events: NavigationScreen;
};

export interface ICreateEventScreen {
  createEvent: NavigationScreen;
  selectMatch: NavigationScreen;
}

export interface ICreateFanClubScreen {
  createFanClub: NavigationScreen;
  selectCity: NavigationScreen;
  selectTeam: NavigationScreen;
}

export interface IEditProfileScreen {
  editProfile: NavigationScreen;
  updateField: NavigationScreen;
}

export type ScreenNavigationConfig = Record<
  string,
  {
    tabName: string;
    initialScreenName: string;
    screens: NavigationScreen[];
  }
>;

export interface ITeamTabNavigationProps {
  tabName: string;
  id: ResourceIdentifier;
}

export interface IFanClubTabNavigationProps {
  tabName: string;
  id: ResourceIdentifier;
}

export interface ISearchTabNavigationProps {
  searchText: string;
}
