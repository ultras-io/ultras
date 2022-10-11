import { FanClubMemberStatusEnum } from '@ultras/utils';
import { ColorKey, ColorType } from 'themes/types';
import { Icons } from 'assets/icons';

interface IOnButtonPress {
  (): void;
}

interface IButtonStyle {
  bg: string;
  _pressed: { bg: string };
  _text: { color: string };
}

export interface IButtonAttribute {
  icon?: {
    name: Icons;
    color: ColorKey;
  };
  button: {
    variant: string;
    text: string;
    style: {} | IButtonStyle;
    onPress?: IOnButtonPress;
  };
}

function buildStyle(
  colors: ColorType,
  initial: ColorKey,
  pressed: ColorKey,
  text: ColorKey
): IButtonStyle {
  return {
    bg: colors[initial],
    _pressed: {
      bg: colors[pressed],
    },
    _text: {
      color: colors[text],
    },
  };
}

export function buildButtonAttributes(
  joinStatus: FanClubMemberStatusEnum,
  colors: ColorType,
  onButtonPress?: IOnButtonPress
): IButtonAttribute {

  // active - means user already in fan club's member list.
  if (joinStatus === FanClubMemberStatusEnum.active) {
    return {
      icon: {
        name: Icons.Check,
        color: 'iconPrimary',
      },
      button: {
        variant: 'actionInvert',
        text: 'fanClubs-joined',
        style: {},
        onPress: onButtonPress,
      },
    };
  }

  // pending request - means user requested to join to fan club.
  if (joinStatus === FanClubMemberStatusEnum.pendingRequest) {
    const style = buildStyle(
      colors,
      'buttonSecondary',
      'buttonSecondaryPressed',
      'textPrimary'
    );

    return {
      icon: {
        name: Icons.Dots,
        color: 'iconPrimaryInvert',
      },
      button: {
        variant: 'action',
        text: 'fanClubs-pendingRequest',
        style: style,
        onPress: onButtonPress,
      },
    };
  }

  // pending invitation - invitation sent by fan club admin/owner and need
  //                      to be replied by user (accept or reject).
  if (joinStatus === FanClubMemberStatusEnum.pendingInvitation) {
    const style = buildStyle(
      colors,
      'buttonSecondary',
      'buttonSecondaryPressed',
      'textPrimary'
    );

    return {
      icon: {
        name: Icons.Dots,
        color: 'iconPrimaryInvert',
      },
      button: {
        variant: 'action',
        text: 'fanClubs-pendingInvitation',
        style: style,
        onPress: onButtonPress,
      },
    };
  }

  // banned - means admin or owner has blocked member.
  if (joinStatus === FanClubMemberStatusEnum.banned) {
    return {
      button: {
        variant: 'action',
        text: 'fanClubs-banned',
        style: {},
      },
    };
  }

  // no status - means user not in fan club's member list.
  return {
    icon: {
      name: Icons.ArrowForward,
      color: 'iconPrimaryInvert',
    },
    button: {
      variant: 'action',
      text: 'fanClubs-join',
      style: {},
      onPress: onButtonPress,
    },
  };
}
