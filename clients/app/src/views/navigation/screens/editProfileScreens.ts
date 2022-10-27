import type { IEditProfileScreen } from '../types';
import EditProfile from 'views/screens/EditProfile/screens/EditProfile';
import UpdateField from 'views/screens/EditProfile/screens/UpdateField';

const screens: IEditProfileScreen = {
  editProfile: {
    name: 'EditProfileForm',
    component: EditProfile,
  },
  updateField: {
    name: 'UpdateField',
    component: UpdateField,
  },
};

export default screens;
