import {ComponentType} from 'react';
// import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

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
  supportersClub: NavigationScreen;
  supportersClubAbout: NavigationScreen;
  match: NavigationScreen;
  event: NavigationScreen;
};

export type SearchNavigationScreens = {
  search: NavigationScreen;
  supportersClub: NavigationScreen;
  supportersClubAbout: NavigationScreen;
  event: NavigationScreen;
  match: NavigationScreen;
};

export type MatchesNavigationScreens = {
  matches: NavigationScreen;
  match: NavigationScreen;
  event: NavigationScreen;
};

export type EventsNavigationScreens = {
  events: NavigationScreen;
  match: NavigationScreen;
  event: NavigationScreen;
  newEvent: NavigationScreen;
};

export type ProfileNavigationScreens = {
  profile: NavigationScreen;
  settings: NavigationScreen;
};

export type SearchTabScreens = {
  all: NavigationScreen;
  event: NavigationScreen;
  team: NavigationScreen;
  supportersClubs: NavigationScreen;
  ultras: NavigationScreen;
};

export type ListModalTabScreens = {
  footballClubs: NavigationScreen;
  nationalTeams: NavigationScreen;
};
