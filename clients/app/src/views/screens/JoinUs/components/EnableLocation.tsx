import React from 'react';
import { Box, Button } from 'native-base';
import LocationService from 'services/location/locationService';
import registrationStore from 'stores/registration';
import type { IEnableLocationProps } from '../types';

const EnableLocation: React.FC<IEnableLocationProps> = ({ useStore, text }) => {
  const setLocationEnabled = useStore(registrationStore.setLocationEnabledSelector());
  const nextStep = useStore(registrationStore.nextStepSelector());

  const requestLocation = React.useCallback(async () => {
    setLocationEnabled(await LocationService.hasLocationPermission());
    nextStep();
  }, [setLocationEnabled, nextStep]);

  return (
    <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
      <Button onPress={requestLocation} variant={'primary'}>
        {text}
      </Button>
    </Box>
  );
};

export default React.memo<IEnableLocationProps>(EnableLocation);
