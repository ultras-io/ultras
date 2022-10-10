import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import type { CommonScreens } from '../types';

import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Post from 'views/screens/Post';
import Team from 'views/screens/Team';
import FanClub from 'views/screens/FanClub';
import FanClubAbout from 'views/screens/FanClubAbout';
import Profile from 'views/screens/Profile';
import CreateEvent from 'views/screens/CreateEvent';
import CreateFanClub from 'views/screens/CreateFanClub';
import ProfileList from 'views/screens/ProfileList';
import Notifications from 'views/screens/Notifications';
import Room from 'views/screens/Room';

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
  createEvent: {
    name: 'CreateEvent',
    component: CreateEvent,
    options: {
      ...defaultOptions,
      presentation: 'modal',
      headerShown: false,
    },
  },
  createFanClub: {
    name: 'CreateFanClub',
    component: CreateFanClub,
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
  notifications: {
    name: 'Notifications',
    component: Notifications,
    options: {
      ...defaultOptions,
      headerTitle: () => (
        <Text variant={'sectionTitle'} flex={1}>
          {I18n.t('common-notifications')}
        </Text>
      ),
    },
  },
  room: {
    name: 'Room',
    component: Room,
    options: {
      ...defaultOptions,
    },
  },
};

export default SCREENS;
