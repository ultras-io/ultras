import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import Settings from 'views/screens/Settings';
import EditProfile from 'views/screens/EditProfile';
import type { ProfileNavigationScreens } from '../types';

export const TAB_NAME = 'Profile';

const SCREENS: ProfileNavigationScreens = {
  settings: {
    name: 'Settings',
    component: Settings,
    options: {
      headerTitle: () => (
        <Text variant={'sectionTitle'} flex={1}>
          {I18n.t('profile-settings')}
        </Text>
      ),
    },
  },
  editProfile: {
    name: 'EditProfile',
    component: EditProfile,
    options: {
      presentation: 'modal',
      headerShown: false,
    },
  },
};

export default SCREENS;
