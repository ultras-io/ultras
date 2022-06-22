import React from 'react';
// import { View } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import { WithBadge, SizeEnum as BadgeSize } from 'views/components/base/WithBadge';
// import { Icons as Icons } from 'assets/icons';
import Container from 'views/components/base/Container';
import { IProfileProps } from './types';
// import { screenSettings } from 'views/navigation/screens';
// import styles from './styles';

const ProfileContainer = React.lazy(() => import('./containers/ProfileContainer'));

const Profile: React.FC<IProfileProps> = ({ route }) => {
  const { id } = route.params;
  const { setOptions, pushTo } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      // headerRight: () => (
      // <View style={styles.headerButtonsContainer}>
      //   <Button
      //     onPress={() => {
      //       pushTo(screenSettings.settings);
      //     }}
      //     appearance={ButtonAppearance.Minimal}
      //     size={ButtonSize.ExtraBig}
      //     icon={Icons.Settings}
      //   />
      //   <WithBadge number={1} size={BadgeSize.Small} bgColor="iconNotification">
      //     <Button
      //       onPress={() => {
      //         pushTo(screenSettings.notifications);
      //       }}
      //       appearance={ButtonAppearance.Minimal}
      //       size={ButtonSize.ExtraBig}
      //       icon={Icons.Notifications}
      //     />
      //   </WithBadge>
      // </View>
      // ),
    });
  }, [setOptions, pushTo]);

  return (
    <Container withSuspense>
      <ProfileContainer id={id} />
    </Container>
  );
};

export default Profile;
