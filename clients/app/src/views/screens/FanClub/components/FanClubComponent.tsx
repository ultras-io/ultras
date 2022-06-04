import React from 'react';
import { Divider } from 'native-base';
import { useTheme } from 'themes';
// import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import { commonScreens } from 'views/navigation/screens';
import FanClubInfo from 'views/components/compositions/FanClubInfo';
import { IFanClubComponentProps } from '../types';
// import styles from '../styles';
// import gStyles from 'styles/styles';

const FanClubComponent: React.FC<IFanClubComponentProps> = ({ data }) => {
  // const { setOptions, pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  // const onScroll = React.useCallback(
  //   ({ nativeEvent }) => {
  //     let alpha = (nativeEvent.contentOffset.y - 30) / (70 - 30);
  //     if (alpha < 0) alpha = 0;
  //     else if (alpha > 1) alpha = 1;
  //     setOptions({
  //       headerTitle: () => (
  //         <UltrasText
  //           style={[gStyles.screenTitle, { opacity: alpha }]}
  //           color="primary"
  //           numberOfLines={1}
  //         >
  //           {data.name}
  //         </UltrasText>
  //       ),
  //     });
  //   },
  //   [data.name, setOptions]
  // );

  return (
    <>
      <FanClubInfo data={data} />
      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );

  // return (
  //   <FlatList
  //     keyExtractor={item => item.id.toString()}
  //     showsHorizontalScrollIndicator={false}
  //     renderItem={renderColumn}
  //     data={data.feed}
  //     onScroll={onScroll}
  //     scrollEventThrottle={16}
  //     ListHeaderComponent={
  //       <FanClubInfo
  //         avatarUri={data.avatarUri}
  //         name={data.name}
  //         ultrasCount={data.ultrasCount}
  //         city={data.city}
  //         team={data.team}
  //         myStatus={data.myStatus}
  //       />
  //     }
  //   />
  // );
};

export default FanClubComponent;
