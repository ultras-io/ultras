import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import WithSafeArea from 'views/components/base/WithSafeArea';
import UltrasText from 'views/components/base/UltrasText';
import { IFanClubAboutProps } from './types';
import styles from './styles';

const FanClubAbout: React.FC<IFanClubAboutProps> = ({ route }) => {
  const { description } = route.params;
  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  return (
    <WithSafeArea>
      <View style={styles.closeButton}>
        <Button
          onPress={goBack}
          variant={'empty'}
          alignSelf="flex-start"
          _text={{ color: colors.textAction }}
        >
          {I18n.t('close')}
        </Button>
      </View>
      <UltrasText color="textPrimary" style={styles.title}>
        About
      </UltrasText>
      <UltrasText color="textSecondary" style={styles.text}>
        {description}
      </UltrasText>
    </WithSafeArea>
  );
};

export default FanClubAbout;
