import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import TeamsComponent from 'views/components/compositions/TeamsHorizontal/TeamsComponent';
import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';

import { ITeamsContainerProps } from './types';
import styles from 'views/components/compositions/TeamsHorizontal/styles';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ data, withBounce = true }) => {
  const { pushTo } = useNavigationWithParams();

  return (
    <View>
      <View style={styles.header}>
        <UltrasText style={styles.title} color={'tertiary'}>
          {I18n.t('teams')}
        </UltrasText>
      </View>
      <TeamsComponent
        data={data}
        onPress={id => pushTo(commonScreens.team, { id })}
        withBounce={withBounce}
      />
    </View>
  );
};

export default TeamsContainer;
