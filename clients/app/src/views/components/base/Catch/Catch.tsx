import React from 'react';
import { View, Pressable } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import { commonScreens } from 'views/navigation/screens';
import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { ICatchProps } from './type';
import styles from './styles';

const Catch: React.FC<ICatchProps> = ({
  isCaught = false,
  count = 0,
  iconSize = 'ic-md',
  onPress = undefined,
  textColor = 'buttonAction',
  catchType = undefined,
  catchResourceId = undefined,
}) => {
  const { pushTo } = useNavigationWithParams();

  const onCountPress = React.useCallback(() => {
    if (!catchType) {
      return;
    }

    pushTo(commonScreens.profileList.name, {
      id: catchResourceId,
      type: catchType,
    });
  }, [catchType, catchResourceId, pushTo]);

  return (
    <Pressable
      onPress={preventMultiCalls(onPress)}
      onLongPress={onCountPress}
      style={styles.container}
    >
      <Icon
        name={isCaught ? Icons.Caught : Icons.Catch}
        color={isCaught ? 'textAction' : 'buttonAction'}
        size={iconSize}
      />

      {count > 0 && (
        <UltrasText style={styles.count} color={textColor}>
          {getReadableNumber(count)}
        </UltrasText>
      )}
    </Pressable>
  );
};

export default React.memo<ICatchProps>(Catch);
