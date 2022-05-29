import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';
import FanClubsComponent from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';
import { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { IconNamesEnum as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { tabScreens, searchTabScreens } from 'views/navigation/screens';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';
import styles from 'views/components/compositions/FanClubsHorizontal/styles';

const TAB_NAME = 'Search';

const fanClubsStore = buildFanClubsStore();
fanClubsStore.getAll();

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  showHeaderButton = true,
  withBounce = true,
}) => {
  const result = fanClubsStore.useSelector('list');

  const { changeTab } = useNavigationWithParams();

  const navigateToFanClubs = React.useCallback(() => {
    changeTab(tabScreens.search.name); // navigate to Search in TabNavigation
    setTimeout(() => {
      changeTab(`${TAB_NAME}:${searchTabScreens.fanClubs.name}`); // navigate to clubs in TopTabNavigation
    });
  }, [changeTab]);

  return (
    <View>
      <View style={styles.header}>
        <UltrasText style={styles.title} color="textSectionHeader">
          {I18n.t('fanClubs')}
        </UltrasText>
        {showHeaderButton && (
          <Button
            title={I18n.t('discover')}
            onPress={navigateToFanClubs}
            appearance={ButtonAppearance.Minimal}
            boxSize={ButtonBoxSize.Contain}
            color="textQuaternary"
            icon={Icons.ArrowRightRound}
          />
        )}
      </View>
      <FanClubsComponent
        data={result.list.data || []}
        onEndReached={fanClubsStore.getAll}
        avatarSize={AvatarSize.Big}
        withBounce={withBounce}
      />
    </View>
  );
};

export default FanClubsContainer;
