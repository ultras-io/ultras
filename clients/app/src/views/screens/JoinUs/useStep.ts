import React from 'react';

const useStep = (initialStep: number): [number, () => void, (st: number) => void] => {
  const [step, setStep] = React.useState<number>(initialStep);

  const nextStep = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);

  const jumpToStep = React.useCallback(
    (st: number) => {
      setStep(st);
    },
    [setStep]
  );

  return [step, nextStep, jumpToStep];
};

export default useStep;
