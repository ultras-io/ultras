import React from 'react';
import { ComponentType } from 'react';

import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Post from 'views/screens/Post';
import Team from 'views/screens/Team';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
import Profile from 'views/screens/Profile';
import NewEvent from 'views/screens/NewEvent';
import ProfileList from 'views/screens/ProfileList';

import UltrasText from 'views/components/base/UltrasText';

import type { CommonScreens } from '../types';
import styles from 'styles/styles';

// don't touch ordering
const SCREENS: CommonScreens = {
  match: {
    name: 'Match',
    component: Match,
  },
  event: {
    name: 'Event',
    component: Event,
  },
  post: {
    name: 'Post',
    component: Post,
  },
  team: {
    name: 'Team',
    component: Team,
  },
  supportersClub: {
    name: 'SupportersClub',
    component: SupportersClub,
  },
  profile: {
    name: 'Profile',
    component: Profile,
    headerTitle: () => (
      <UltrasText style={styles.headerLogo} color="primary">
        ultras
      </UltrasText>
    ),
  },
  profileList: {
    name: 'ProfileList',
    component: ProfileList,
  },
  newEvent: {
    name: 'NewEvent', // @TODO change to create Event
    component: NewEvent,
    isModal: true,
    headerShown: false,
  },
  supportersClubAbout: {
    name: 'SupportersClubAbout',
    component: SupportersClubAbout,
    isModal: true,
    headerShown: true,
  },
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
  options: any = defaultOptions
) => (
  <Stack.Screen
    key={`${tabName}:${screenName}`}
    name={`${tabName}:${screenName}`}
    component={component}
    initialParams={{ tabName }}
    options={options}
  />
);

export const generateCommonScreens = (tabName: string, Stack: any) => (
  <React.Fragment>
    {Object.values(SCREENS).map(item => {
      if (!item.isModal) {
        return generateScreen(
          tabName,
          item.name,
          Stack,
          item.component,
          item.headerTitle
            ? {
                headerTitle: item.headerTitle,
              }
            : defaultOptions
        );
      }
    })}

    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      {Object.values(SCREENS).map(item => {
        if (item.isModal) {
          return generateScreen(tabName, item.name, Stack, item.component, {
            headerShown: item.headerShown,
          });
        }
      })}
    </Stack.Group>
  </React.Fragment>
);

export default SCREENS;
