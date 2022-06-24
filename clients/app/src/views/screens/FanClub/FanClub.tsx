import React from 'react';
import { IconButton } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import Container from 'views/components/base/Container';
import { IFanClubProps } from './types';

const FanClubContainer = React.lazy(() => import('./containers/FanClubContainer'));

const FanClub: React.FC<IFanClubProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <IconButton
          onPress={preventMultiCalls(() =>
            pushTo(commonScreens.fanClubAbout.name, { description: data.description })
          )}
          variant="ghost"
          icon={<Icon name={Icons.InfoDark} color={'iconPrimary'} size={'ic-md'} />}
        />
      ),
    });
  }, [setOptions, pushTo, data.description]);

  return (
    <Container withSuspense withBg>
      <FanClubContainer data={data} />
    </Container>
  );
};

export default FanClub;
