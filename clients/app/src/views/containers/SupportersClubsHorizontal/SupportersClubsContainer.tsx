import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import SupportersClubsComponent from 'views/components/compositions/SupportersClubsHorizontal/SupportersClubsComponent';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';
import { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { IconNamesEnum as Icons } from 'assets/icons';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import tabScreens from 'navigation/tab/tabScreens';
import commonScreens from 'navigation/commonScreens';

import searchTabScreens, { TAB_NAME } from 'navigation/searchTab/searchTabScreens';

import { ISupportersClubsContainerProps } from './types';
import styles from 'views/components/compositions/SupportersClubsHorizontal/styles';

import { generateSupportersClubs } from 'utils/helpers/dummy';

const SupportersClubsContainer: React.FC<ISupportersClubsContainerProps> = ({
  showHeaderButton = true,
  avatarSize = AvatarSize.Big,
  data,
  withBounce = true,
}) => {
  // get data
  data = data ? data : generateSupportersClubs(10);

  const { changeTab, pushTo } = useNavigationWithParams();

  const navigateToSupportersClubs = React.useCallback(() => {
    changeTab(tabScreens.search.name); // navigate to Search in TabNavigation
    setTimeout(() => {
      changeTab(`${TAB_NAME}:${searchTabScreens.supportersClubs.name}`); // navigate to clubs in TopTabNavigation
    });
  }, [changeTab]);

  return (
    <View>
      <View style={styles.header}>
        <UltrasText style={styles.title} color={'tertiary'}>
          {I18n.t('supportersClubs')}
        </UltrasText>
        {showHeaderButton && (
          <Button
            title={I18n.t('discover')}
            onPress={navigateToSupportersClubs}
            appearance={ButtonAppearance.Minimal}
            boxSize={ButtonBoxSize.Contain}
            color="text"
            icon={Icons.ArrowRightRound}
          />
        )}
      </View>
      <SupportersClubsComponent
        data={data}
        onPress={id => pushTo(commonScreens.supportersClub.name, { id })}
        onEndReached={() => {}}
        avatarSize={avatarSize}
        withBounce={withBounce}
      />
    </View>
  );
};

export default SupportersClubsContainer;
