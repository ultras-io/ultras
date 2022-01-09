import { ComponentType } from 'react';

export type CommonScreens = {
  match: string;
  event: string;
  post: string;
  team: string;
  supportersClub: string;
  supportersClubAbout: string;
  profile: string;
  newEvent: string;
  profileList: string;
};

export type NavigationScreen = {
  name: string;
  tabName?: string;
  component: ComponentType<any>;
  options?: any; // NativeStackNavigationOptions
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

export type HomeNavigationScreens = {
  home: NavigationScreen;
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
