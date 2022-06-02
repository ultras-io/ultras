import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import MatchesComponent from '../components/MatchesComponent';
import UltrasText from 'views/components/base/UltrasText';
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
        <UltrasText style={styles.title} color="textSectionHeader">
          {I18n.t('upcomingMatches')}
        </UltrasText>
        <Button
          onPress={navigateToMatches}
          rightIcon={
            <Icon name={Icons.ArrowRightRound} color={'iconPrimary'} size={'ic-2xs'} />
          }
          variant={'empty'}
        >
          {I18n.t('viewAll')}
        </Button>
      </View>
      <MatchesComponent data={result.list.data || []} onEndReached={() => {}} />
    </View>
  );
};

export default MatchesContainer;
