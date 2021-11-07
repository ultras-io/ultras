import React from 'react';
import {ComponentType} from 'react';

import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Post from 'views/screens/Post';
import Team from 'views/screens/Team';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
import NewEvent from 'views/screens/NewEvent';

import type {CommonScreens} from './types';

export const TAB_NAME = 'Search';

const SCREENS: CommonScreens = {
  match: 'Match',
  event: 'Event',
  post: 'Post',
  team: 'Team',
  supportersClub: 'SupportersClub',
  supportersClubAbout: 'SupportersClubAbout',
  newEvent: 'NewEvent',
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
    {generateScreen(tabName, SCREENS.match, Stack, Match)}
    {generateScreen(tabName, SCREENS.event, Stack, Event)}
    {generateScreen(tabName, SCREENS.post, Stack, Post)}
    {generateScreen(tabName, SCREENS.team, Stack, Team)}
    {generateScreen(tabName, SCREENS.supportersClub, Stack, SupportersClub)}
    <Stack.Group screenOptions={{presentation: 'modal'}}>
      {generateScreen(
        tabName,
        SCREENS.supportersClubAbout,
        Stack,
        SupportersClubAbout,
        {
          headerShown: false,
        },
      )}
      {generateScreen(tabName, SCREENS.newEvent, Stack, NewEvent)}
    </Stack.Group>
  </>
);

export default SCREENS;
