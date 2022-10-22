import React from 'react';
import { Box, Button } from 'native-base';
import I18n from 'i18n/i18n';
import { KeyValueGroup } from 'views/components/base/KeyValue';
import PersonalInfoInputComponent from '../components/PersonalInfoInputComponent';
import { IPersonalInfoContainerProps } from './types';
import * as editProfileStore from 'stores/editProfile';

const PersonalInfoContainer: React.FC<IPersonalInfoContainerProps> = ({ data }) => {
  const useStore = editProfileStore.initStore();
  const store = useStore();

  const invalidData = React.useMemo(() => {
    // full name is required
    if (!store.fullname.valid) {
      return true;
    }

    // one of following field are required
    return !store.email.valid && !store.phone.valid;
  }, [store.email, store.fullname, store.phone]);

  React.useEffect(() => {
    store.initiateWithValues({
      userId: data.id,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSavePress = React.useCallback(() => {
    if (invalidData) {
      return;
    }

    store.update();
  }, [invalidData, store]);

  return (
    <Box padding={4}>
      <KeyValueGroup description={I18n.t('profile-edit-description')}>
        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-fullName')}
          value={store.fullname.value}
          onChange={value => store.setFieldValue('fullname', value)}
        />

        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-phoneNumber')}
          value={store.phone.value}
          onChange={value => store.setFieldValue('phone', value)}
          keyboardType="phone-pad"
        />

        <PersonalInfoInputComponent
          name={I18n.t('profile-edit-email')}
          value={store.email.value}
          onChange={value => store.setFieldValue('email', value)}
          keyboardType="email-address"
        />
      </KeyValueGroup>

      <Button
        disabled={invalidData}
        variant="primary"
        marginTop="8"
        onPress={onSavePress}
      >
        {I18n.t('common-save')}
      </Button>
    </Box>
  );
};

export default PersonalInfoContainer;
