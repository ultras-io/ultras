import React from 'react';
import { Box } from 'native-base';
import I18n from 'i18n/i18n';
import { KeyValueGroup } from 'views/components/base/KeyValue';
import PersonalInfoInputComponent from '../components/PersonalInfoInputComponent';
import { IPersonalInfoContainerProps } from './types';
import * as editProfileStore from 'stores/editProfile';

const PersonalInfoContainer: React.FC<IPersonalInfoContainerProps> = ({ data }) => {
  const useStore = editProfileStore.initStore();
  const store = useStore();

  React.useEffect(() => {
    store.initiateWithValues({
      userId: data.id,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box padding={4}>
      <KeyValueGroup description={I18n.t('profile-edit-description')}>
        <PersonalInfoInputComponent
          label={I18n.t('profile-edit-fullName')}
          name="fullname"
        />

        <PersonalInfoInputComponent
          label={I18n.t('profile-edit-phoneNumber')}
          name="phone"
        />

        <PersonalInfoInputComponent label={I18n.t('profile-edit-email')} name="email" />
      </KeyValueGroup>
    </Box>
  );
};

export default PersonalInfoContainer;
