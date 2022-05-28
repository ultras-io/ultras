import React from 'react';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FanClubContainer from './containers/FanClubContainer';
import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';
import WithSafeArea from 'views/components/base/WithSafeArea';
import { IFanClubProps } from './types';

const FanClub: React.FC<IFanClubProps> = ({ route }) => {
  const { isDarkMode } = useTheme();

  const { data } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            pushTo(commonScreens.fanClubAbout.name, { description: data.description })
          }
          appearance={ButtonAppearance.Minimal}
          size={ButtonSize.ExtraBig}
          icon={isDarkMode ? Icons.InfoDark : Icons.InfoLight}
          color="headerButton"
        />
      ),
    });
  }, [setOptions, pushTo, data.description, isDarkMode]);

  return (
    <WithSafeArea>
      <FanClubContainer data={data} />
    </WithSafeArea>
  );
};

export default FanClub;
