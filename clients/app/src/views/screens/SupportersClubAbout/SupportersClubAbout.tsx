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
import { ISupportersClubAboutProps } from './types';

import styles from './styles';

const SupportersClubAbout: React.FC<ISupportersClubAboutProps> = ({ about }) => {
  const { goBack } = useNavigationWithParams();

  about =
    'Postponed for a year due to the pandemic, the Euro 2020 football tournament is this year being held in 11 different European cities with limited crowds inside stadiums.\n\nRome is one of the host cities, including for Italy’s three group stage matches and a quarter-final game on July 3rd.\n\nBut with capacity currently limited at stadiums and fewer people likely to travel amid the pandemic, what are the options if you’re watching in other public places in order to soak up the atmosphere (and some beer)?\n\nRome has a large dedicated fan zone for watching games on big mainScreens.tsx within the football village at Piazza del Popolo. Said to be the largest fan zone in Europe, it has a maximum capacity of 2,000 people.\n\nTo enter, people must fill out a self-certification form,wear masks and have their body temperature scanned. No proof of coronavirus testing or vaccination is required.';

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
        {about}
      </UltrasText>
    </WithSafeArea>
  );
};

export default SupportersClubAbout;
