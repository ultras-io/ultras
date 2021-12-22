import React from 'react';
import {View} from 'react-native';
import WithSafeArea from 'views/components/base/WithSafeArea';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Button, {
  AppearanceEnum as ButtonAppearance,
  SizeEnum as ButtonSize,
} from 'views/components/base/Button';
import {WithBadge, SizeEnum as BadgeSize} from 'views/components/base/Badge';
import {IconNamesEnum as Icons} from 'assets/icons';
import ProfileContainer from './containers/ProfileContainer';
import screens from 'navigation/profile/profileScreens';
import styles from './styles';
import {IProfileProps} from './types';

const Profile: React.FC<IProfileProps> = ({route}) => {
  const {id} = route.params;
  const {setOptions, pushTo} = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <Button
            onPress={() => {
              pushTo(screens.settings.name);
            }}
            appearance={ButtonAppearance.Minimal}
            size={ButtonSize.ExtraBig}
            icon={Icons.Settings}
          />
          <WithBadge number={1} size={BadgeSize.Small} bgColor="danger">
            <Button
              onPress={() => {
                pushTo(screens.notifications.name);
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
