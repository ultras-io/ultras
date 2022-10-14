import React from 'react';
import { Input, Text, VStack, ScrollView, TextArea } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { fanClubsStore } from '../../../store';
import SelectedCityComponent from '../components/SelectedCityComponent';
import SelectedTeamComponent from '../components/SelectedTeamComponent';

const DetailsContainer: React.FC = () => {
  const { colors } = useTheme();
  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const [isKeyboardOpen, keyboardHeight] = useKeyboard();
  const scrollPosition = React.useRef(0);
  const refFanClubName = React.useRef();
  const refDescription = React.useRef();
  const refScroll = React.useRef();

  const onFocus = React.useCallback(ref => {
    ref.current?.measureLayout(refScroll.current, (left, top: number) => {
      scrollPosition.current = top;
    });
  }, []);

  React.useLayoutEffect(() => {
    if (isKeyboardOpen && keyboardHeight !== 0) {
      setTimeout(() => {
        refScroll.current?.scrollTo({
          y: scrollPosition.current - +keyboardHeight,
          animated: true,
        });
      });
    }
  }, [isKeyboardOpen, keyboardHeight]);

  return (
    <ScrollView mb={+keyboardHeight} ref={refScroll}>
      <VStack space={4} paddingX={3}>
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
    </ScrollView>
  );
};

export default DetailsContainer;
