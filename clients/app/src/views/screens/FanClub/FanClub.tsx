import React from 'react';
import { IconButton } from 'native-base';
import Container from 'views/components/base/Container';
// import FanClubTabNavigation from './components/FanClubTabNavigation';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import buildFanClubsStore from 'stores/fanClubs/fanClubs';
import { IFanClubProps } from './types';

const FanClubContainer = React.lazy(() => import('./containers/FanClubContainer'));

const FanClub: React.FC<IFanClubProps> = ({ route }) => {
  const { tabName, data } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  const fanClubsStore = React.useMemo(() => buildFanClubsStore(), []);
  const { single: storeSingle } = fanClubsStore.useSelector('single');

  const fanClubData = React.useMemo(() => {
    return storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data;
  }, [data, storeSingle.data, storeSingle.status]);

  React.useLayoutEffect(() => {
    setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <IconButton
          onPress={preventMultiCalls(() =>
            pushTo(commonScreens.fanClubAbout.name, {
              description: fanClubData.description,
            })
          )}
          variant="ghost"
          icon={<Icon name={Icons.InfoDark} color={'iconPrimary'} size={'ic-md'} />}
        />
      ),
    });
  }, [setOptions, pushTo, fanClubData.description]);

  return (
    <Container withSuspense withBg>
      <FanClubContainer data={fanClubData} />
      {/* <FanClubTabNavigation tabName={tabName} id={fanClubData.id} /> */}
    </Container>
  );
};

export default FanClub;
