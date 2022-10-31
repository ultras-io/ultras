import React from 'react';
import { LayoutChangeEvent, SafeAreaView, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { Box, Button, ScrollView, Text, VStack, HStack } from 'native-base';
import { InterfaceScrollViewProps } from 'native-base/lib/typescript/components/basic/ScrollView/types';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import { fanClubsStore } from '../../../store';
import { ISwiperContainerProps } from '../types';

const SwiperContainer = React.forwardRef<InterfaceScrollViewProps, ISwiperContainerProps>(
  (
    { keyboardHeight, isSubmitEnabled, slides },
    refScroll: null | React.Ref<InterfaceScrollViewProps>
  ) => {
    const { colors } = useTheme();

    const { add: storeAdd } = fanClubsStore.useSelector('add');

    const [index, setIndex] = React.useState(0);
    const refSwiper = React.useRef<Swiper | null>(null);

    const isFirstAction = index === 0;
    const isLastAction = index === slides.length - 1;

    // open component by index - when index was changed
    React.useEffect(() => {
      refSwiper.current?.scrollTo(index, true);
    }, [index]);

    const onPrevPress = React.useCallback(() => {
      setIndex((oldIndex: number) => {
        return oldIndex <= 0 ? 0 : oldIndex - 1;
      });
    }, []);

    const onNextPress = React.useCallback(() => {
      if (isLastAction) {
        return storeAdd.create();
      }

      const max = slides.length - 1;
      setIndex((oldIndex: number) => {
        return oldIndex >= max ? max : oldIndex + 1;
      });
    }, [isLastAction, slides.length, storeAdd]);

    const [titleSectionHeight, setTitleSectionHeight] = React.useState(0);
    const onTitleSectionLayout = React.useCallback((event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setTitleSectionHeight(height);
    }, []);

    const [buttonSectionHeight, setButtonSectionHeight] = React.useState(0);
    const onButtonSectionLayout = React.useCallback((event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setButtonSectionHeight(height);
    }, []);

    const scrollViewSpaceBottom = React.useMemo(() => {
      if (keyboardHeight === 0) {
        return 0;
      }

      return keyboardHeight - buttonSectionHeight - titleSectionHeight;
    }, [keyboardHeight, buttonSectionHeight, titleSectionHeight]);

    return (
      <SafeAreaView style={styles.safeArea}>
        <VStack flex={1} space={5} justifyContent="space-between">
          <ScrollView ref={refScroll} flex={1} marginBottom={scrollViewSpaceBottom}>
            <VStack space={6}>
              <Text paddingX={3} variant={'title'} onLayout={onTitleSectionLayout}>
                {I18n.t('fanClubs-create-title')}
              </Text>

              <Swiper
                ref={refSwiper}
                loop={false}
                alwaysBounceHorizontal={true}
                scrollsToTop={true}
                scrollEnabled={false}
                showsPagination={false}
                height="100%"
              >
                {slides.map((slide, i) => (
                  <Box key={`create-fan-club-container-${i}`}>{slide}</Box>
                ))}
              </Swiper>
            </VStack>
          </ScrollView>

          <VStack onLayout={onButtonSectionLayout}>
            <HStack justifyContent="center" space={2} paddingY={3}>
              {slides.map((_, i: number) => (
                <Box
                  key={`SwiperContainer-slide-${i}`}
                  width={2}
                  height={2}
                  borderRadius="full"
                  backgroundColor={
                    i === index ? colors.dotIndicatorActive : colors.dotIndicator
                  }
                />
              ))}
            </HStack>

            <Button.Group paddingX={3} isAttached={true} borderRadius={13} width={'100%'}>
              <Button
                variant="primaryInvert"
                width={isFirstAction ? 0 : 70}
                onPress={onPrevPress}
              >
                <Icon name={Icons.Back} size={isFirstAction ? 0 : 'sm'} />
              </Button>

              <Button
                variant="primary"
                flexGrow={1}
                borderLeftRadius={isFirstAction ? 13 : undefined}
                onPress={onNextPress}
                disabled={!isSubmitEnabled(index)}
                isLoading={storeAdd.status === 'loading'}
              >
                {I18n.t(!isLastAction ? 'common-next' : 'fanClubs-add-button')}
              </Button>
            </Button.Group>
          </VStack>
        </VStack>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default SwiperContainer;
