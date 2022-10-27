import React from 'react';
import { Dimensions } from 'react-native';
import { Box, Button, Text, ScrollView } from 'native-base';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import DetailsContainer from './containers/DetailsContainer';
import VisualContainer from './containers/VisualContainer';
import PrivacyContainer from './containers/PrivacyContainer';
import { fanClubsStore } from '../../store';
import { ICreateFanClubProps } from './types';
import { commonScreens } from 'views/navigation/screens';

const { height: windowHeight } = Dimensions.get('window');
const headerHeight = 160;

const CreateFanClub: React.FC<ICreateFanClubProps> = () => {
  const { colors } = useTheme();
  const { goBack, pushTo } = useNavigationWithParams();
  const route = useRoute();

  const safeAreaInsets = useSafeAreaInsets();

  const [isKeyboardOpen, keyboardHeight] = useKeyboard();
  const scrollPosition = React.useRef(0);
  const refScroll = React.useRef();

  const onFocus = React.useCallback(ref => {
    ref.current?.measureLayout(refScroll.current, (left, top: number) => {
      scrollPosition.current = top;
    });
  }, []);

  React.useLayoutEffect(() => {
    if (isKeyboardOpen) {
      setTimeout(() => {
        refScroll.current?.scrollTo({
          y: scrollPosition.current - +keyboardHeight,
          animated: true,
        });
      });
    }
  }, [isKeyboardOpen, keyboardHeight]);

  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const slides = React.useMemo(() => {
    return [
      <DetailsContainer onFocus={onFocus} />,
      <VisualContainer />,
      <PrivacyContainer />,
    ];
  }, [onFocus]);

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
    const fields = [
      [
        storeAdd.data?.name.isValid,
        storeAdd.data?.shortName.isValid,
        storeAdd.data?.teamId.isValid,
        storeAdd.data?.cityId.isValid,
        storeAdd.data?.description.isValid,
      ],
      [storeAdd.data?.avatar.isValid, storeAdd.data?.coverPhoto.isValid],
      [storeAdd.data?.privacy.isValid],
    ];

    const validateFields = fields[index];
    if (!validateFields) {
      return false;
    }

    for (const validateField of validateFields) {
      if (!validateField) {
        return false;
      }
    }

    return true;

    // // disable only last button if form is not valid
    // if (!isLastAction) {
    //   return true;
    // }

    // return storeAdd.valid;
  }, [
    storeAdd.data?.name.isValid,
    storeAdd.data?.shortName.isValid,
    storeAdd.data?.teamId.isValid,
    storeAdd.data?.cityId.isValid,
    storeAdd.data?.description.isValid,
    storeAdd.data?.avatar.isValid,
    storeAdd.data?.coverPhoto.isValid,
    storeAdd.data?.privacy.isValid,
    index,
  ]);

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
      const fanClub = storeAdd.createdData;

      storeAdd.reset();
      goBack();

      setImmediate(() => {
        if (fanClub) {
          pushTo(commonScreens.fanClub.name, { data: fanClub });
        }
      });
    }
  }, [goBack, pushTo, storeAdd, storeAdd.status]);

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

      <ScrollView
        ref={refScroll}
        marginBottom={+keyboardHeight}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom,
        }}
      >
        <Text paddingX={3} marginBottom={27} variant={'title'}>
          {I18n.t('fanClubs-create-title')}
        </Text>

        <Swiper
          ref={refSwiper}
          loop={false}
          bounces={true}
          scrollsToTop={true}
          scrollEnabled={false}
          alwaysBounceHorizontal={true}
          activeDotColor={colors.dotIndicatorActive}
          dotColor={colors.dotIndicator}
          onIndexChanged={setIndex}
          height={
            windowHeight - (headerHeight + safeAreaInsets.top + 2 * safeAreaInsets.bottom)
          }
        >
          {slides.map((slide, i) => (
            <Box key={`create-fan-club-container-${i}`}>{slide}</Box>
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
            isLoading={storeAdd.status === 'loading'}
          >
            {I18n.t(!isLastAction ? 'common-next' : 'fanClubs-add-button')}
          </Button>
        </Button.Group>
      </ScrollView>
    </>
  );
};

export default CreateFanClub;
