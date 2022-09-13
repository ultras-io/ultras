import React from 'react';
import { Actionsheet, Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';

interface ICancelRequestProps {
  fanClubName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CancelRequestActionSheet: React.FC<ICancelRequestProps> = ({
  fanClubName,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useTheme();

  return (
    <Actionsheet isOpen={isOpen} onClose={onCancel}>
      <Actionsheet.Content>
        <Center
          borderBottomWidth={'0.5'}
          borderColor={colors.backgroundCard}
          paddingTop={3}
          paddingBottom={10}
          width="full"
        >
          <Text variant={'actionSheetTitle'}>
            {I18n.t('fanClubs-pendingRequest-cancel-title', { fanClub: fanClubName })}
          </Text>
        </Center>

        <Actionsheet.Item onPress={onConfirm} alignItems="center">
          <Text variant={'actionSheetItemNegative'}>
            {I18n.t('fanClubs-pendingRequest-cancel-confirm')}
          </Text>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={onCancel} alignItems="center">
          <Text variant={'actionSheetItem'}>
            {I18n.t('fanClubs-pendingRequest-cancel-close')}
          </Text>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CancelRequestActionSheet;
