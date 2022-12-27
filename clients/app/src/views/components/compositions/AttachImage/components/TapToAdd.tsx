import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import PressableArea from './PressableArea';
import { ITapToAddProps } from '../types';

const TapToAdd: React.FC<ITapToAddProps> = ({ imageItem, onChoose }) => {
  return (
    <PressableArea imageItem={imageItem} onChoose={onChoose}>
      <Text variant={'smallText'} textAlign="center">
        {I18n.t('common-tapToAdd')}
      </Text>
    </PressableArea>
  );
};

export default TapToAdd;
