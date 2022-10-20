import React from 'react';
import { Box, Button } from 'native-base';
import I18n from 'i18n/i18n';
import { KeyValueGroup } from 'views/components/base/KeyValue';
import PersonalInfoInputComponent from '../components/PersonalInfoInputComponent';
import { IPersonalInfoContainerProps } from './types';

const PersonalInfoContainer: React.FC<IPersonalInfoContainerProps> = ({ data }) => {
  return (
    <Box padding={4}>
      <KeyValueGroup description={I18n.t('profile-edit-description')}>
        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-fullName')}
          value={data.fullname}
        />

        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-phoneNumber')}
          value={data.phone}
        />

        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-email')}
          value={data.email}
        />
      </KeyValueGroup>

      <Button variant="primary" marginTop="8">{I18n.t('common-save')}</Button>
    </Box>
  );
};

export default PersonalInfoContainer;
