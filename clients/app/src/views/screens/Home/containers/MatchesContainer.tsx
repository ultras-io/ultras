import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import MatchesComponent from '../components/MatchesComponent';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { tabScreens } from 'views/navigation/screens';

import buildMatchesStore from 'stores/matches';

import { IMatchesContainerProps } from '../types';
import styles from '../styles';

const matchesStore = buildMatchesStore();
matchesStore.getAll();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const result = matchesStore.useSelector('list');

  const { changeTab } = useNavigationWithParams();

  const navigateToMatches = React.useCallback(() => {
    changeTab(tabScreens.matches.name);
  }, [changeTab]);

  return (
    <View>
      <View style={styles.header}>
        <UltrasText style={styles.title} color={'tertiary'}>
          {I18n.t('upcomingMatches')}
        </UltrasText>
        <Button
          appearance={ButtonAppearance.Minimal}
          boxSize={ButtonBoxSize.Contain}
          icon={Icons.ArrowRightRound}
          onPress={navigateToMatches}
          title={I18n.t('viewAll')}
          color="text"
        />
      </View>
      <MatchesComponent data={result.list.data || []} onEndReached={() => {}} />
    </View>
  );
};

export default MatchesContainer;
