import React from 'react';
import { Actionsheet, Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';

interface ICancelRequestProps {
  fanClubName: string;
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  onCancel: () => void;
}

const RespondInvitationActionSheet: React.FC<ICancelRequestProps> = ({
  fanClubName,
  isOpen,
  onAccept,
  onReject,
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
            {I18n.t('fanClubs-pendingInvitation-respond-title', { fanClub: fanClubName })}
          </Text>
        </Center>

        <Actionsheet.Item onPress={onAccept} alignItems="center">
          <Text variant={'actionSheetItemPositive'}>
            {I18n.t('fanClubs-pendingInvitation-respond-accept')}
          </Text>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={onReject} alignItems="center">
          <Text variant={'actionSheetItemNegative'}>
            {I18n.t('fanClubs-pendingInvitation-respond-reject')}
          </Text>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={onCancel} alignItems="center">
          <Text variant={'actionSheetItem'}>
            {I18n.t('fanClubs-pendingInvitation-respond-close')}
          </Text>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RespondInvitationActionSheet;
