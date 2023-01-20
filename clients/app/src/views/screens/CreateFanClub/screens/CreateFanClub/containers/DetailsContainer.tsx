import React from 'react';
import { Input, Text, VStack, TextArea } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { fanClubsStore } from 'views/screens/CreateFanClub/stores';
import SelectedCityComponent from '../components/SelectedCityComponent';
import SelectedTeamComponent from '../components/SelectedTeamComponent';
import { IDetailsComponentProps } from '../types';

const DetailsContainer: React.FC<IDetailsComponentProps> = ({ onFocus }) => {
  const { colors } = useTheme();
  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const refFanClubName = React.useRef();
  const refFanClubShortName = React.useRef();
  const refDescription = React.useRef();

  return (
    <VStack space={4} paddingX={3}>
      <VStack space={2}>
        <Text variant="cardInfo">{I18n.t('fanClubs-add-details')}</Text>

        <Input
          value={storeAdd.data?.name.valueOriginal}
          variant={'form'}
          placeholder={I18n.t('fanClubs-add-details-name')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(refFanClubName)}
          ref={refFanClubName}
          onChange={e => storeAdd.setFieldValue('name', e.nativeEvent.text)}
          marginBottom={0}
        />
      </VStack>

      <Input
        value={storeAdd.data?.shortName.valueOriginal}
        variant={'form'}
        placeholder={I18n.t('fanClubs-add-details-shortName')}
        placeholderTextColor={colors.textQuaternary}
        onFocus={() => onFocus(refFanClubShortName)}
        ref={refFanClubShortName}
        onChange={e => storeAdd.setFieldValue('shortName', e.nativeEvent.text)}
        marginBottom={0}
      />

      <SelectedTeamComponent teamId={storeAdd.data?.teamId.valueOriginal} />

      <SelectedCityComponent cityId={storeAdd.data?.cityId.valueOriginal} />

      <TextArea
        value={storeAdd.data?.description.valueOriginal}
        variant={'form'}
        placeholder={I18n.t('fanClubs-add-description')}
        placeholderTextColor={colors.textQuaternary}
        onFocus={() => onFocus(refDescription)}
        onChange={e => storeAdd.setFieldValue('description', e.nativeEvent.text)}
        ref={refDescription}
      />
    </VStack>
  );
};

export default DetailsContainer;
