import React from 'react';
import { Actionsheet, Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'views/navigation/screens/commonScreens';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import { IAddActionSheetProps } from '../types';

const AddActionSheet: React.FC<IAddActionSheetProps> = ({ isOpen, onClose }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  const closeAndNavigateTo = React.useCallback(
    screen => {
      onClose();
      setTimeout(() => pushTo(screen));
    },
    [onClose, pushTo]
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Center
          borderBottomWidth={'0.5'}
          borderColor={colors.backgroundCard}
          w={'full'}
          py={'3'}
        >
          <Text variant={'actionSheetTitle'}>{I18n.t('common-create')}</Text>
        </Center>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Event} color={'iconPrimary'} size={'ic-md'} />}
          onPress={() => closeAndNavigateTo(commonScreens.createEvent.name)}
        >
          {I18n.t('event')}
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Club} color={'iconPrimary'} size={'ic-sm'} />}
        >
          {I18n.t('fanClub')}
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo<IAddActionSheetProps>(AddActionSheet);
