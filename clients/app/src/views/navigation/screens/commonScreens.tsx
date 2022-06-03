import React from 'react';
import { Text } from 'native-base';
import type { CommonScreens } from '../types';

const Match = React.lazy(() => import('views/screens/Match'));
const Event = React.lazy(() => import('views/screens/Event'));
const Post = React.lazy(() => import('views/screens/Post'));
const Team = React.lazy(() => import('views/screens/Team'));
const FanClub = React.lazy(() => import('views/screens/FanClub'));
const FanClubAbout = React.lazy(() => import('views/screens/FanClubAbout'));
const Profile = React.lazy(() => import('views/screens/Profile'));
const NewEvent = React.lazy(() => import('views/screens/NewEvent'));
const ProfileList = React.lazy(() => import('views/screens/ProfileList'));

const defaultOptions = {
  headerTitle: '',
  headerBackTitle: '',
};

// don't touch ordering
const SCREENS: CommonScreens = {
  match: {
    name: 'Match',
    component: Match,
    options: {
      ...defaultOptions,
    },
  },
  event: {
    name: 'Event',
    component: Event,
    options: {
      ...defaultOptions,
    },
  },
  post: {
    name: 'Post',
    component: Post,
    options: {
      ...defaultOptions,
    },
  },
  team: {
    name: 'Team',
    component: Team,
    options: {
      ...defaultOptions,
    },
  },
  fanClub: {
    name: 'FanClub',
    component: FanClub,
    options: {
      ...defaultOptions,
    },
  },
  profile: {
    name: 'Profile',
    component: Profile,
    options: {
      ...defaultOptions,
      headerTitle: () => (
        <Text variant={'logoSmall'} flex={1}>
          ultras
        </Text>
      ),
    },
  },
  profileList: {
    name: 'ProfileList',
    component: ProfileList,
    options: {
      ...defaultOptions,
    },
  },
  newEvent: {
    name: 'NewEvent', // @TODO change to create Event
    component: NewEvent,
    options: {
      ...defaultOptions,
      presentation: 'modal',
      headerShown: false,
    },
  },
  fanClubAbout: {
    name: 'FanClubAbout',
    component: FanClubAbout,
    options: {
      ...defaultOptions,
      presentation: 'modal',
      headerShown: false,
    },
  },
};

export default SCREENS;
