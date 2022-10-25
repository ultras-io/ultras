import { UserProfilePrivacyEnum } from '@ultras/utils';
import React from 'react';
import { Box, ScrollView, Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import KeyValue, { KeyValueGroup, KeyValueInner } from 'views/components/base/KeyValue';

const Settings: React.FC = () => {
  // @TODO: from store
  const pushNotificationsEnabled = true;

  return (
    <Box flex={1}>
      <Text paddingX={4} marginBottom={27} variant={'title'}>
        {I18n.t('settings-title')}
      </Text>

      <ScrollView flex={1}>
        <VStack space={5} paddingX={3} paddingBottom={5}>
          <VStack space={2}>
            <Text variant="cardInfo">{I18n.t('settings-privacy-details')}</Text>
            <KeyValue
              name={I18n.t('settings-privacy')}
              description={I18n.t('settings-privacy-description')}
              options={{
                [UserProfilePrivacyEnum.private]: I18n.t('settings-privacy-private'),
                [UserProfilePrivacyEnum.public]: I18n.t('settings-privacy-public'),
              }}
              value={UserProfilePrivacyEnum.private}
              // value={storeUpdate.privacy.valueOriginal}
              // onChange={value =>
              //   storeUpdate.setFieldValue('privacy', value as UserProfilePrivacyEnum)
              // }
            />
          </VStack>

          <KeyValue
            name={I18n.t('settings-pushNotifications')}
            description={I18n.t('settings-pushNotifications-description')}
            value={pushNotificationsEnabled}
            // value={storeUpdate.language.valueOriginal}
            // onChange={value => storeUpdate.setFieldValue('language', value)}
          />

          {pushNotificationsEnabled && (
            <KeyValueGroup
              description={I18n.t('settings-pushNotifications-groupDescription')}
            >
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-event-going')}
                value={true}
              />
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-event-interests')}
                value={false}
              />
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-upcomingMatches')}
                value={true}
              />
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-newPosts')}
                value={true}
              />
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-newComments')}
                value={true}
              />
              <KeyValueInner
                name={I18n.t('settings-pushNotifications-fanClubSuggestions')}
                value={true}
              />
            </KeyValueGroup>
          )}

          <VStack space={2}>
            <Text variant="cardInfo">{I18n.t('settings-other-details')}</Text>
            <KeyValue
              name={I18n.t('settings-language')}
              options={{
                en: 'English',
                es: 'Espanol',
                fr: 'France',
                ru: 'Russian',
              }}
              value={'en'}
              // value={storeUpdate.language.valueOriginal}
              // onChange={value => storeUpdate.setFieldValue('language', value)}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Settings;
