import React from 'react';
import { Button } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { commonScreens } from 'views/navigation/screens';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SwiperContainer from './containers/SwiperContainer';
import DetailsContainer from './containers/DetailsContainer';
import VisualContainer from './containers/VisualContainer';
import PrivacyContainer from './containers/PrivacyContainer';
import { fanClubsStore } from '../../store';
import { ICreateFanClubProps } from './types';

const CreateFanClub: React.FC<ICreateFanClubProps> = () => {
  const { colors } = useTheme();
  const { goBack, pushTo } = useNavigationWithParams();
  const route = useRoute();

  const [isKeyboardOpen, keyboardHeight] = useKeyboard();
  const scrollPosition = React.useRef(0);
  const refScroll = React.useRef(null);

  const onFocus = React.useCallback(ref => {
    ref.current?.measureLayout(refScroll.current, (left, top: number) => {
      scrollPosition.current = top;
    });
  }, []);

  React.useEffect(() => {
    if (isKeyboardOpen) {
      setTimeout(() => {
        refScroll.current?.scrollTo({
          y: scrollPosition.current - +keyboardHeight,
          animated: true,
        });
      }, 0);
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

  const isSubmitEnabled = React.useCallback(
    (index: number) => {
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
    },
    [
      storeAdd.data?.name.isValid,
      storeAdd.data?.shortName.isValid,
      storeAdd.data?.teamId.isValid,
      storeAdd.data?.cityId.isValid,
      storeAdd.data?.description.isValid,
      storeAdd.data?.avatar.isValid,
      storeAdd.data?.coverPhoto.isValid,
      storeAdd.data?.privacy.isValid,
    ]
  );

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

      <SwiperContainer
        ref={refScroll}
        keyboardHeight={+keyboardHeight}
        slides={slides}
        isSubmitEnabled={isSubmitEnabled}
      />
    </>
  );
};

export default CreateFanClub;
