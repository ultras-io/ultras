import React from 'react';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Post from 'views/screens/Post';
import Team from 'views/screens/Team';
import FanClub from 'views/screens/FanClub';
import FanClubAbout from 'views/screens/FanClubAbout';
import Profile from 'views/screens/Profile';
import NewEvent from 'views/screens/NewEvent';
import ProfileList from 'views/screens/ProfileList';
import UltrasText from 'views/components/base/UltrasText';
import type { CommonScreens } from '../types';
import styles from 'styles/styles';

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
        <UltrasText style={styles.headerLogo} color="primary">
          ultras
        </UltrasText>
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
