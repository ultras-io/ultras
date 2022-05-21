import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import WithSafeArea from 'views/components/base/WithSafeArea';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
} from 'views/components/base/Button';
import UltrasText from 'views/components/base/UltrasText';
import { IFanClubAboutProps } from './types';
import styles from './styles';

const FanClubAbout: React.FC<IFanClubAboutProps> = ({ route }) => {
  const { description } = route.params;
  const { goBack } = useNavigationWithParams();

  return (
    <WithSafeArea>
      <View style={styles.closeButton}>
        <Button
          appearance={ButtonAppearance.Minimal}
          boxSize={ButtonBoxSize.Contain}
          title={I18n.t('close')}
          color={'secondary'}
          onPress={goBack}
        />
      </View>
      <UltrasText color="text" style={styles.title}>
        About
      </UltrasText>
      <UltrasText color="secondaryText" style={styles.text}>
        {description}
      </UltrasText>
    </WithSafeArea>
  );
};

export default FanClubAbout;
