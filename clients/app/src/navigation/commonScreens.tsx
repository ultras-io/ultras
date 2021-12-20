import React from 'react';
import {ComponentType} from 'react';

import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Post from 'views/screens/Post';
import Team from 'views/screens/Team';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
import Profile from 'views/screens/Profile';
import NewEvent from 'views/screens/NewEvent';
import ProfileList from 'views/screens/ProfileList';

import type {CommonScreens} from './types';

export const TAB_NAME = 'Search';

export const COMMON_SCREENS: CommonScreens = {
  match: 'Match',
  event: 'Event',
  post: 'Post',
  team: 'Team',
  supportersClub: 'SupportersClub',
  supportersClubAbout: 'SupportersClubAbout',
  profile: 'Profile',
  newEvent: 'NewEvent',
  profileList: 'ProfileList',
};

const defaultOptions = {
  headerTitle: '',
  headerBackTitle: '',
};

const generateScreen = (
  tabName: string,
  screenName: string,
  Stack: any,
  component: ComponentType<any>,
  options: any = defaultOptions,
) => (
  <Stack.Screen
    name={`${tabName}:${screenName}`}
    component={component}
    initialParams={{tabName: tabName}}
    options={options}
  />
);

export const generateCommonScreens = (tabName: string, Stack: any) => (
  <>
    {generateScreen(tabName, COMMON_SCREENS.match, Stack, Match)}
    {generateScreen(tabName, COMMON_SCREENS.event, Stack, Event)}
    {generateScreen(tabName, COMMON_SCREENS.post, Stack, Post)}
    {generateScreen(tabName, COMMON_SCREENS.team, Stack, Team)}
    {generateScreen(
      tabName,
      COMMON_SCREENS.supportersClub,
      Stack,
      SupportersClub,
    )}
    {generateScreen(tabName, COMMON_SCREENS.profile, Stack, Profile)}
    {generateScreen(tabName, COMMON_SCREENS.profileList, Stack, ProfileList)}

    <Stack.Group screenOptions={{presentation: 'modal'}}>
      {generateScreen(
        tabName,
        COMMON_SCREENS.supportersClubAbout,
        Stack,
        SupportersClubAbout,
        {
          headerShown: false,
        },
      )}
      {generateScreen(tabName, COMMON_SCREENS.newEvent, Stack, NewEvent)}
    </Stack.Group>
  </>
);

export default COMMON_SCREENS;
