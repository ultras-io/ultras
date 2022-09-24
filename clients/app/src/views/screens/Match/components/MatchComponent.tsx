import React from 'react';
import { Button, Divider } from 'native-base';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import I18n from 'i18n/i18n';
import { commonScreens } from 'views/navigation/screens';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { IMatchComponentProps } from '../types';

const MatchComponent: React.FC<IMatchComponentProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  return (
    <>
      <MatchInfo data={data} />
      <Button
        onPress={() => pushTo(commonScreens.createEvent.name, { matchId: data.id })}
        leftIcon={<Icon name={Icons.Add} color={'iconPrimaryInvert'} size={'ic-xs'} />}
        variant={'action'}
        mt={'3'}
        paddingX={'8'}
        alignSelf={'center'}
      >
        {I18n.t('events-create')}
      </Button>
      <Divider bg={colors.backgroundDividerTransparent} thickness={1} mt={15} />
    </>
  );
};

export default MatchComponent;
