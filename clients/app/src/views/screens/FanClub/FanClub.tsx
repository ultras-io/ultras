import React from 'react';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import { commonScreens } from 'views/navigation/screens';
import FanClubContainer from './containers/FanClubContainer';
import WithSafeArea from 'views/components/base/WithSafeArea';
import { IFanClubProps } from './types';

const FanClub: React.FC<IFanClubProps> = ({ route }) => {
  const { isDarkMode } = useTheme();

  const { data } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      // @TODO change to IconButton
      // headerRight: () => (
      //   <Button
      //     onPress={() =>
      //       pushTo(commonScreens.fanClubAbout.name, { description: data.description })
      //     }
      //     appearance={ButtonAppearance.Minimal}
      //     size={ButtonSize.ExtraBig}
      //     color="iconNavigation"
      //     // @TODO chnage on Button refactoring
      //     title="i"
      //   />
      // ),
    });
  }, [setOptions, pushTo, data.description, isDarkMode]);

  return (
    <WithSafeArea>
      <FanClubContainer data={data} />
    </WithSafeArea>
  );
};

export default FanClub;
