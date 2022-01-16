import React from 'react';
import { View } from 'react-native';
import WithSafeArea from 'views/components/base/WithSafeArea';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import { WithBadge, SizeEnum as BadgeSize } from 'views/components/base/Badge';
import { IconNamesEnum as Icons } from 'assets/icons';
import ProfileContainer from './containers/ProfileContainer';
import { IProfileProps } from './types';
import { screenSettings } from 'navigation/screens';

import styles from './styles';

const Profile: React.FC<IProfileProps> = ({ route }) => {
  const { id } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <Button
            onPress={() => {
              pushTo(screenSettings.settings);
            }}
            appearance={ButtonAppearance.Minimal}
            size={ButtonSize.ExtraBig}
            icon={Icons.Settings}
          />
          <WithBadge number={1} size={BadgeSize.Small} bgColor="danger">
            <Button
              onPress={() => {
                pushTo(screenSettings.notifications);
              }}
              appearance={ButtonAppearance.Minimal}
              size={ButtonSize.ExtraBig}
              icon={Icons.Notifications}
            />
          </WithBadge>
        </View>
      ),
    });
  }, [setOptions, pushTo]);

  return (
    <WithSafeArea>
      <ProfileContainer id={id} />
    </WithSafeArea>
  );
};

export default Profile;
