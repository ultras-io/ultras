import {ComponentType} from 'react';

export type NavigationScreen = {
  name: string;
  component: ComponentType<any>;
};

export type RootNavigationScreens = {
  intro: NavigationScreen;
  joinUs: NavigationScreen;
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
  match: NavigationScreen;
  event: NavigationScreen;
};

export type SearchNavigationScreens = {
  search: NavigationScreen;
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
};

export type ProfileNavigationScreens = {
  profile: NavigationScreen;
  settings: NavigationScreen;
};
