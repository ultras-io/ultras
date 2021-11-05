import React from 'react';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import screens from 'navigation/home/homeScreens';

import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import {IconNamesEnum as Icons} from 'assets/icons';

import WithSafeArea from 'views/components/base/WithSafeArea';
import SupportersClubContainer from './containers/SupportersClubContainer';

import {ISupportersClubProps} from './types';

const SupportersClub: React.FC<ISupportersClubProps> = ({id}) => {
  const {setOptions, pushTo} = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            pushTo(screens.supportersClubAbout.name);
          }}
          appearance={ButtonAppearance.Minimal}
          size={ButtonSize.Big}
          icon={Icons.Info}
        />
      ),
    });
  }, [setOptions, pushTo]);

  return (
    <WithSafeArea>
      <SupportersClubContainer id={id} />
    </WithSafeArea>
  );
};

export default SupportersClub;
