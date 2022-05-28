import React from 'react';
import { View, Image, FlatList } from 'react-native';
import I18n from 'i18n/i18n';
import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import { ISearchListComponentProps, dataTypeEnum } from '../types';
import styles from '../styles';

const SearchListComponent: React.FC<ISearchListComponentProps> = ({
  data,
  dataType,
  onEndReached,
}) => {
  // const flatListRef = React.useRef<FlatList<any>>();

  const renderRow = React.useCallback(
    ({ item }) => (
      <Box
        bgColor={'opacityBgColor'}
        style={[
          styles.row,
          item === data[0] && styles.firstRow,
          item === data[data.length - 1] && styles.lastRow,
        ]}
      >
        <Box
          borderColor={'opacityBgColor'}
          style={[
            styles.borderedRow,
            item === data[data.length - 1] && styles.lastBorderedRow,
          ]}
        >
          <View style={styles.rowContainer}>
            {dataType === dataTypeEnum.Team ? (
              <>
                <Image source={{ uri: item.logo }} style={styles.logo} />
                <UltrasText style={styles.text} color="text">
                  {item.name}
                </UltrasText>
              </>
            ) : (
              <>
                <UltrasText style={styles.text} color="text">
                  {item.name}
                </UltrasText>
                <UltrasText style={styles.text} color="tertiaryText">
                  {' '}
                  {item.telPrefix}
                </UltrasText>
              </>
            )}
          </View>
        </Box>
      </Box>
    ),
    [data, dataType]
  );

  // React.useEffect(() => {
  //   data.length && flatListRef?.current?.scrollToIndex({index: 0});
  // }, [data]);

  return (
    <Box bgColor="background" style={styles.flexList}>
      <FlatList
        // ref={flatListRef}
        ListFooterComponent={
          <UltrasText color="secondaryText" style={styles.footerText}>
            {I18n.t('canChangeClub')}
          </UltrasText>
        }
        ListHeaderComponent={<View style={styles.headerSpace} />}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
      />
    </Box>
  );
};

export default React.memo<ISearchListComponentProps>(SearchListComponent);
