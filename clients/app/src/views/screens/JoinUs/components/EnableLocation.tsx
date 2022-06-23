import React from 'react';
import { Box, Button } from 'native-base';
import LocationService from 'services/location/locationService';
import type { IState } from 'stores/registration';
import type { IEnableLocationProps } from '../types';

const EnableLocation: React.FC<IEnableLocationProps> = ({ useStore, text }) => {
  const setLocationEnabledSelector = React.useCallback(
    () => (state: IState) => state.setLocationEnabled,
    []
  );
  const nextStepSelector = React.useCallback(() => (state: IState) => state.nextStep, []);
  const setLocationEnabled = useStore(setLocationEnabledSelector());
  const nextStep = useStore(nextStepSelector());

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
