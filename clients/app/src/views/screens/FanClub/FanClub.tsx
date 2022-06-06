import React from 'react';
import { Pressable } from 'native-base';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FanClubContainer from './containers/FanClubContainer';
import { WithBg } from 'views/components/base/Bg';
import { IFanClubProps } from './types';

const FanClub: React.FC<IFanClubProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            pushTo(commonScreens.fanClubAbout.name, { description: data.description })
          }
        >
          <Icon name={Icons.InfoDark} color={'iconPrimary'} size={'ic-md'} />
        </Pressable>
      ),
    });
  }, [setOptions, pushTo, data.description]);

  return (
    <WithBg>
      <FanClubContainer data={data} />
    </WithBg>
  );
};

export default FanClub;
