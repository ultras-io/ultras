import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import Divider from 'views/components/base/Divider';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {ISupportersClubCardProps} from './types';

import styles from './styles';

const StyledView = styled.View<ISupportersClubCardProps>`
  background-color: ${({theme}) => {
    return theme.colors.backgroundColor;
  }};
`;

const SupportersClubCard: React.FC<ISupportersClubCardProps> = ({
  avatarUri,
  name,
  ultrasCount,
  city,
}) => {
  return (
    <StyledView style={styles.container}>
      <View style={styles.avatar}>
        <Avatar uri={avatarUri} size={AvatarSize.Big} />
      </View>
      <View style={styles.info}>
        <UltrasText color="lightText" style={styles.name}>
          {name}
        </UltrasText>
        <View style={styles.line}>
          <UltrasText color="lightText">
            {getReadableNumber(ultrasCount)} {I18n.t('ultras')}
          </UltrasText>
          <View style={styles.divider}>
            <Divider />
          </View>
          <UltrasText color="lightText">{city}</UltrasText>
        </View>
      </View>
    </StyledView>
  );
};

export default React.memo<ISupportersClubCardProps>(SupportersClubCard);
