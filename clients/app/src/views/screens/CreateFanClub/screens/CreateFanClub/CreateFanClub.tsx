import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Box, Button, Text } from 'native-base';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import DetailsContainer from './containers/DetailsContainer';
import VisualContainer from './containers/VisualContainer';
import PrivacyContainer from './containers/PrivacyContainer';
import { fanClubsStore } from '../../store';
import { ICreateFanClubProps } from './types';

const CreateFanClub: React.FC<ICreateFanClubProps> = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();
  const route = useRoute();

  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const slides = React.useMemo(() => {
    return [<DetailsContainer />, <VisualContainer />, <PrivacyContainer />];
  }, []);

  const [index, setIndex] = React.useState(0);
  const refSwiper = React.useRef<Swiper | null>(null);

  const isFirstAction = index === 0;
  const isLastAction = index === slides.length - 1;

  // open component by index - when index was changed
  React.useEffect(() => {
    refSwiper.current?.scrollTo(index, true);
  }, [index]);

  // decrease index
  const onPrevPress = React.useCallback(() => {
    setIndex((oldIndex: number) => {
      return oldIndex === 0 ? oldIndex : oldIndex - 1;
    });
  }, []);

  // increase index
  const onNextPress = React.useCallback(() => {
    if (isLastAction) {
      return storeAdd.create();
    }

    setIndex((oldIndex: number) => {
      return oldIndex === slides.length - 1 ? oldIndex : oldIndex + 1;
    });
  }, [isLastAction, slides.length, storeAdd]);

  const isSubmitEnabled = React.useMemo(() => {
    if (!isLastAction) {
      return true;
    }

    return storeAdd.valid;
  }, [storeAdd.valid, isLastAction]);

  React.useEffect(() => {
    if (!route.params?.selected) {
      return;
    }

    if (route.params?.selected.dataType === 'team') {
      storeAdd.setFieldValue('teamId', route.params.selected.id);
    }
  }, [route.params, storeAdd]);

  React.useEffect(() => {
    if (storeAdd.status === 'success') {
      storeAdd.reset();
      goBack();

      // @TODO: show success message
    }
  }, [storeAdd.status, goBack, storeAdd]);

  return (
    <>
      <Button
        onPress={goBack}
        variant={'empty'}
        alignSelf="flex-start"
        _text={{ color: colors.textAction }}
        mt={'5'}
        mb={'2.5'}
        px={'2.5'}
      >
        {I18n.t('common-close')}
      </Button>

      <SafeAreaView style={styles.safeArea}>
        <Text paddingX={3} marginBottom={27} variant={'title'}>
          {I18n.t('fanClubs-create-title')}
        </Text>

        <Swiper
          ref={refSwiper}
          scrollEnabled={false}
          alwaysBounceHorizontal={true}
          activeDotColor={colors.dotIndicatorActive}
          dotColor={colors.dotIndicator}
          loop={false}
          onIndexChanged={setIndex}
        >
          {slides.map((slide, i) => (
            <Box key={`create-fan-club-container-${i}`} flex={1}>
              {slide}
            </Box>
          ))}
        </Swiper>

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
            disabled={!isSubmitEnabled}
            isLoading={add.status === 'loading'}
          >
            {I18n.t(!isLastAction ? 'common-next' : 'fanClubs-add-button')}
          </Button>
        </Button.Group>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CreateFanClub;
