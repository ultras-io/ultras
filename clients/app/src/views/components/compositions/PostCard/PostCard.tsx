import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';

import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import {IconNamesEnum} from '../../../../assets/icons';

import {IPostCardProps} from './types';
import styles from './styles';

const StyledContainer = styled.View<IPostCardProps>`
  background-color: ${({theme}) => {
    return theme.colors.backgroundColor;
  }};
`;

const PostCard: React.FC<IPostCardProps> = ({
  date,
  title,
  supportersClub,
  commentsCount,
  isFollowing,
}) => {
  return (
    <StyledContainer style={styles.container}>
      <UltrasText style={styles.date} color="lightText">
        {date.toLocaleTimeString([], {
          month: 'short',
          day: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </UltrasText>
      <UltrasText style={styles.title} color="lightText">
        {title}
      </UltrasText>
      <UltrasText style={styles.supportersClub} color="lightText">
        {I18n.t('postDiscussionAt')}
        <UltrasText
          style={[styles.supportersClub, styles.bold]}
          color="lightText">
          {supportersClub}
        </UltrasText>
      </UltrasText>

      <View style={styles.bottomButtons}>
        <UltrasText color="lightText" style={styles.comments}>
          {commentsCount} com.
        </UltrasText>
        {!isFollowing && (
          <Button
            title={I18n.t('postFollowTopic')}
            onPress={() => {}}
            boxSize={ButtonBoxSize.Contain}
            size={ButtonSize.Default}
            color="lightText"
            bgColor="secondary"
            icon={IconNamesEnum.Hearth}
            iconPosition={ButtonIconPosition.Right}
          />
        )}
        <View style={styles.arrow}>
          <Icon key="icon" name={IconNamesEnum.ArrowRight} size={12} />
        </View>
      </View>
    </StyledContainer>
  );
};

export default React.memo<IPostCardProps>(PostCard);
