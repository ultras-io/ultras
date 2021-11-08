import React from 'react';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import SupportersClubContainer from './containers/SupportersClubContainer';
import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import {IconNamesEnum as Icons} from 'assets/icons';
import WithSafeArea from 'views/components/base/WithSafeArea';

import {ISupportersClubProps} from './types';

const SupportersClub: React.FC<ISupportersClubProps> = ({route}) => {
  const {id} = route.params;
  const {setOptions, pushTo} = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            pushTo(commonScreens.supportersClubAbout);
          }}
          appearance={ButtonAppearance.Minimal}
          size={ButtonSize.ExtraBig}
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
