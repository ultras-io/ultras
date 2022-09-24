import React from 'react';
import { FanClubMemberStatusEnum, FanClubPrivacyEnum } from '@ultras/utils';
import { useTheme } from 'themes';
import { Button, useDisclose } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import buildFanClubMembersStore from 'stores/fanClubMembers';
import { IFanClubInfoProps } from './types';
import CancelRequestActionSheet from './actions/CancelRequestActionSheet';
import RespondInvitationActionSheet from './actions/RespondInvitationActionSheet';
import {
  buildButtonAttributes,
  ButtonAttributeInterface,
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
  const [joinStatus, setJoinStatus] = React.useState<FanClubMemberStatusEnum | undefined>(
    data.joinStatus || undefined
  );

  React.useEffect(() => {
    setJoinStatus(data.joinStatus);
  }, [data.joinStatus]);

  /**
   * On join button press.
   *
   * If fan club is public then user will be joined to fan club automatically,
   * otherwise join request will be sent and state will be in pending-invitation.
   */
  const onJoinPress = React.useCallback(() => {
    const newJoinStatus =
      data.privacy === FanClubPrivacyEnum.public
        ? FanClubMemberStatusEnum.active
        : FanClubMemberStatusEnum.pendingRequest;

    setJoinStatus(newJoinStatus);

    fanClubMembersStore.setAddFieldValue('fanClubId', data.id);
    fanClubMembersStore.create();
  }, [data.privacy, data.id, fanClubMembersStore]);

  /**
   * On leave button press.
   */
  const onLeavePress = React.useCallback(() => {
    setJoinStatus(undefined);
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
    setJoinStatus(undefined);

    fanClubMembersStore.setResourceId(data.id);
    fanClubMembersStore.setUpdateFieldValue('type', 'reject-invitation');
    fanClubMembersStore.updateData();
  }, [actionRespondInvitation, data.id, fanClubMembersStore]);

  React.useEffect(() => {
    if (storeAdd.status === 'error') {
      setJoinStatus(undefined);
    }
    if (storeDelete.status === 'error') {
      setJoinStatus(
        data.privacy === FanClubPrivacyEnum.public
          ? FanClubMemberStatusEnum.active
          : FanClubMemberStatusEnum.pendingRequest
      );
    }
  }, [joinStatus, data.privacy, storeAdd.status, storeDelete.status]);

  const { icon, button } = React.useMemo((): ButtonAttributeInterface => {
    if (!joinStatus) {
      return buildButtonAttributes(joinStatus, theme.colors, onJoinPress);
    }

    switch (joinStatus) {
      case FanClubMemberStatusEnum.active:
        return buildButtonAttributes(joinStatus, theme.colors, onLeavePress);
      case FanClubMemberStatusEnum.pendingRequest:
        return buildButtonAttributes(joinStatus, theme.colors, onCancelRequestPress);

      case FanClubMemberStatusEnum.pendingInvitation:
        return buildButtonAttributes(joinStatus, theme.colors, onRespondInvitationPress);

      case FanClubMemberStatusEnum.banned:
        return buildButtonAttributes(joinStatus, theme.colors);
    }
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
        leftIcon={
          !icon ? undefined : <Icon name={icon.name} color={icon.color} size="ic-xs" />
        }
        variant={button.variant}
        marginTop={'3'}
        marginRight={'4'}
        disabled={!button.onPress}
        onPress={button.onPress}
        {...button.style}
      >
        {I18n.t(button.text)}
      </Button>

      <CancelRequestActionSheet
        fanClubName={data.shortName}
        isOpen={actionCancelRequest.isOpen}
        onCancel={onCancelClosePress}
        onConfirm={onCancelConfirmPress}
      />

      <RespondInvitationActionSheet
        fanClubName={data.shortName}
        isOpen={actionRespondInvitation.isOpen}
        onCancel={actionRespondInvitation.onClose}
        onAccept={onInvitationAcceptPress}
        onReject={onInvitationRejectPress}
      />
    </>
  );
};

export default FanClubJoinButton;
