import React from 'react';
import { Button } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { IBackButtonComponentProps } from '../types';

const BackButtonComponent: React.FC<IBackButtonComponentProps> = ({
  action = 'back',
  position = 'left',
  type = 'text',
}) => {
  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  return (
    <Button
      onPress={goBack}
      variant={'empty'}
      alignSelf={position === 'left' ? 'flex-start' : 'flex-end'}
      _text={{ color: colors.textAction }}
      mt={'5'}
      mb={'2.5'}
      px={'2.5'}
    >
      {(type === 'icon' || type === 'both') && (
        <>
          {/* @TODO: add icons for close and back */}
          {action === 'close' ? null : null}
        </>
      )}

      {(type === 'text' || type === 'both') && (
        <>{I18n.t(action === 'close' ? 'common-close' : 'common-back')}</>
      )}
    </Button>
  );
};

export default BackButtonComponent;
