import React, {useCallback} from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
} from 'views/components/base/Button';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

import homeScreens from 'navigation/home/homeScreens';
import tabScreens from 'navigation/tab/tabScreens';

import {IHomeProps} from './types';
import styles from './styles';

const Home: React.FC<IHomeProps> = () => {
  const {pushTo, changeTab} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(homeScreens.match.name);
  }, [pushTo]);

  const navigateToEvent = useCallback(() => {
    pushTo(homeScreens.event.name);
  }, [pushTo]);

  const navigateToMatches = useCallback(() => {
    changeTab(tabScreens.matches.name);
  }, [changeTab]);

  return (
    <WithSafeArea>
      <Button
        title="Push Single Match"
        onPress={navigateToMatch}
        boxSize={ButtonBoxSize.Contain}
      />
      <Button
        title="Push Event"
        onPress={navigateToEvent}
        boxSize={ButtonBoxSize.Contain}
      />
      <Button
        title="Navigate to Matches"
        onPress={navigateToMatches}
        boxSize={ButtonBoxSize.Contain}
      />
    </WithSafeArea>
  );
};

export default Home;
