import React from 'react';
import {View} from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import UltrasText from 'views/components/base/UltrasText';
import ProfileListComponent from '../components/ProfileListComponent';
import {generateProfiles} from 'utils/helpers/dummy';
import {IProfileListContainerProps} from '../types';
import styles from '../styles';
import gStyles from 'styles/styles';

const ProfileListContainer: React.FC<IProfileListContainerProps> = ({
  title,
}) => {
  const data = generateProfiles(25);
  const {setOptions} = useNavigationWithParams();

  React.useEffect(() => {
    setOptions({
      headerTitle: () => (
        <UltrasText
          style={gStyles.screenTitle}
          color={'tertiary'}
          numberOfLines={1}>
          {title}
        </UltrasText>
      ),
    });
  }, [setOptions, title]);

  return (
    <View style={styles.container}>
      <ProfileListComponent data={data} />
    </View>
  );
};

export default ProfileListContainer;
