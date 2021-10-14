import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Icon from '../Icon';
import {IconNamesEnum as Icons} from '../../../../assets/icons';
import {getReadableNumber} from 'utils/helpers/readableNumber';

import {ICommentsCountProps} from './types';

import styles from './styles';

const CommentsCount: React.FC<ICommentsCountProps> = ({count}) => {
  return (
    <View style={styles.container}>
      <Icon key="icon" name={Icons.Comments} size={24} />
      <View style={styles.commentsView}>
        <UltrasText style={styles.comments} numberOfLines={1}>
          {count !== 0 && getReadableNumber(count)}
        </UltrasText>
      </View>
    </View>
  );
};

export default React.memo<ICommentsCountProps>(CommentsCount);
