import { ColorKey, ColorType } from 'themes/types';
import { Icons } from 'assets/icons';
import { FanClubMemberStatusEnum } from '@ultras/utils';

interface OnButtonPressInterface {
  (): void;
}

interface ButtonStyleInterface {
  bg: string;
  _pressed: { bg: string };
  _text: { color: string };
}

export interface ButtonAttributeInterface {
  icon?: {
    name: Icons;
    color: ColorKey;
  };
  button: {
    variant: string;
    text: string;
    style: {} | ButtonStyleInterface;
    onPress?: OnButtonPressInterface;
  };
}

function buildStyle(
  colors: ColorType,
  initial: ColorKey,
  pressed: ColorKey,
  text: ColorKey
): ButtonStyleInterface {
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
  joinStatus: FanClubMemberStatusEnum | undefined | null,
  colors: ColorType,
  onButtonPress?: OnButtonPressInterface
): ButtonAttributeInterface {
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

  if (joinStatus === FanClubMemberStatusEnum.banned) {
    return {
      button: {
        variant: 'action',
        text: 'fanClubs-banned',
        style: {},
      },
    };
  }

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
