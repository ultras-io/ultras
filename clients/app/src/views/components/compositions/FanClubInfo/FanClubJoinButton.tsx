import React from 'react';
import { FanClubMemberStatusEnum, FanClubPrivacyEnum } from '@ultras/utils';
import { useTheme } from 'themes';
import { Button, useDisclose } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import buildFanClubMembersStore from 'stores/fanClubMembers';
import { IFanClubInfoProps } from './types';
import ConfirmActionSheet from './actions/ConfirmActionSheet';
import {
  buildButtonAttributes,
  IButtonAttribute,
} from './actions/buttonAttributes';

const FanClubJoinButton: React.FC<IFanClubInfoProps> = ({ data }) => {
  const theme = useTheme();

  const actionCancelRequest = useDisclose();
  const actionRespondInvitation = useDisclose();

  const fanClubMembersStore = React.useMemo(() => buildFanClubMembersStore(), []);
  const { add: storeAdd, delete: storeDelete } = fanClubMembersStore.useSelector(
    'add',
    'delete'
  );

  /**
   * Current state of the join status.
   */
  const [joinStatus, setJoinStatus] = React.useState<FanClubMemberStatusEnum>(
    data.joinStatus || FanClubMemberStatusEnum.notRelated
  );

  React.useEffect(() => {
    setJoinStatus(data.joinStatus || FanClubMemberStatusEnum.notRelated);
  }, [data.joinStatus]);

  /**
   * On join button press.
   *
   * If fan club is public then user will be joined to fan club automatically,
   * otherwise join request will be sent and state will be in pending-invitation.
   */
  const onJoinPress = React.useCallback(() => {
    if (data.privacy === FanClubPrivacyEnum.public) {
      setJoinStatus(FanClubMemberStatusEnum.active);
    } else {
      setJoinStatus(FanClubMemberStatusEnum.pendingRequest);
    }

    fanClubMembersStore.setAddFieldValue('fanClubId', data.id);
    fanClubMembersStore.create();
  }, [data.privacy, data.id, fanClubMembersStore]);

  /**
   * On leave button press.
   */
  const onLeavePress = React.useCallback(() => {
    setJoinStatus(FanClubMemberStatusEnum.notRelated);
    fanClubMembersStore.remove({ fanClubId: data.id });
  }, [data.id, fanClubMembersStore]);

  /**
   * On cancel join request button press.
   *
   * Need to show confirmation action-sheet.
   */
  const onCancelRequestPress = React.useCallback(() => {
    actionCancelRequest.onOpen();
  }, [actionCancelRequest]);

  /**
   * On cancel join request close button press.
   *
   * Action will called from confirmation action-sheet containing two buttons:
   * - Cancel request
   * - Keep waiting
   */
  const onCancelClosePress = React.useCallback(() => {
    actionCancelRequest.onClose();
  }, [actionCancelRequest]);

  /**
   * On cancel join request confirm button press.
   *
   * Action will called from confirmation action-sheet.
   */
  const onCancelConfirmPress = React.useCallback(() => {
    actionCancelRequest.onClose();
    onLeavePress();
  }, [actionCancelRequest, onLeavePress]);

  /**
   * On respond invitation button press.
   *
   * Need to show action-sheet containing two buttons:
   * - Accept invitation
   * - Reject invitation
   * - Close
   */
  const onRespondInvitationPress = React.useCallback(() => {
    actionRespondInvitation.onOpen();
  }, [actionRespondInvitation]);

  /**
   * On respond invitation accept button press.
   *
   * Action will called from confirmation action-sheet.
   */
  const onInvitationAcceptPress = React.useCallback(() => {
    actionRespondInvitation.onClose();
    setJoinStatus(FanClubMemberStatusEnum.active);

    fanClubMembersStore.setResourceId(data.id);
    fanClubMembersStore.setUpdateFieldValue('type', 'accept-invitation');
    fanClubMembersStore.updateData();
  }, [actionRespondInvitation, data.id, fanClubMembersStore]);

  /**
   * On respond invitation reject button press.
   *
   * Action will called from confirmation action-sheet.
   */
  const onInvitationRejectPress = React.useCallback(() => {
    actionRespondInvitation.onClose();
    setJoinStatus(FanClubMemberStatusEnum.notRelated);

    fanClubMembersStore.setResourceId(data.id);
    fanClubMembersStore.setUpdateFieldValue('type', 'reject-invitation');
    fanClubMembersStore.updateData();
  }, [actionRespondInvitation, data.id, fanClubMembersStore]);

  /**
   * On invitation close button press.
   *
   * Action will called from confirmation action-sheet containing three buttons:
   * - Accept invitation
   * - Reject invitation
   * - Close
   */
  const onInvitationClosePress = React.useCallback(() => {
    actionRespondInvitation.onClose();
  }, [actionRespondInvitation]);

  React.useEffect(() => {
    if (storeAdd.status === 'error') {
      setJoinStatus(FanClubMemberStatusEnum.notRelated);
    }
    if (storeDelete.status === 'error') {
      if (data.privacy === FanClubPrivacyEnum.public) {
        setJoinStatus(FanClubMemberStatusEnum.active);
      } else {
        setJoinStatus(FanClubMemberStatusEnum.pendingRequest);
      }
    }
  }, [joinStatus, data.privacy, storeAdd.status, storeDelete.status]);

  const { icon, button } = React.useMemo((): IButtonAttribute => {
    if (joinStatus === FanClubMemberStatusEnum.active) {
      return buildButtonAttributes(joinStatus, theme.colors, onLeavePress);
    }
    if (joinStatus === FanClubMemberStatusEnum.pendingRequest) {
      return buildButtonAttributes(joinStatus, theme.colors, onCancelRequestPress);
    }
    if (joinStatus === FanClubMemberStatusEnum.pendingInvitation) {
      return buildButtonAttributes(joinStatus, theme.colors, onRespondInvitationPress);
    }
    if (joinStatus === FanClubMemberStatusEnum.banned) {
      return buildButtonAttributes(joinStatus, theme.colors);
    }
    return buildButtonAttributes(joinStatus, theme.colors, onJoinPress);
  }, [
    onJoinPress,
    onLeavePress,
    onCancelRequestPress,
    onRespondInvitationPress,
    joinStatus,
    theme.colors,
  ]);

  return (
    <>
      <Button
        leftIcon={icon && <Icon name={icon.name} color={icon.color} size="ic-xs" />}
        variant={button.variant}
        marginTop={'3'}
        marginRight={'4'}
        disabled={!button.onPress}
        onPress={button.onPress}
        {...button.style}
      >
        {I18n.t(button.text)}
      </Button>

      <ConfirmActionSheet
        title={I18n.t('fanClubs-pendingRequest-cancel-title', {
          fanClub: data.name,
        })}
        isOpen={actionCancelRequest.isOpen}
        onCancel={actionCancelRequest.onClose}
        buttons={[
          {
            text: I18n.t('fanClubs-pendingRequest-cancel-confirm'),
            onPress: onCancelConfirmPress,
          },
          {
            text: I18n.t('fanClubs-pendingRequest-cancel-close'),
            onPress: onCancelClosePress,
          },
        ]}
      />

      <ConfirmActionSheet
        title={I18n.t('fanClubs-pendingInvitation-respond-title', {
          fanClub: data.name,
        })}
        isOpen={actionRespondInvitation.isOpen}
        onCancel={actionRespondInvitation.onClose}
        buttons={[
          {
            text: I18n.t('fanClubs-pendingInvitation-respond-accept'),
            onPress: onInvitationAcceptPress,
          },
          {
            text: I18n.t('fanClubs-pendingInvitation-respond-reject'),
            onPress: onInvitationRejectPress,
          },
          {
            text: I18n.t('fanClubs-pendingInvitation-respond-close'),
            onPress: onInvitationClosePress,
          },
        ]}
      />
    </>
  );
};

export default FanClubJoinButton;
