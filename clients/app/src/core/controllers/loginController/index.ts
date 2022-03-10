// @ts-ignore @TODO find type declaration package
import create from 'zustand';

import {
  GetState,
  IControllerMethods,
  ILoginModel,
  SetState,
  Step,
  StepsEnum,
} from './types';

const model = create<ILoginModel>((set: SetState, get: GetState) => ({
  steps: [
    {
      stepId: StepsEnum.start,
      processed: false,
    },
    {
      stepId: StepsEnum.second,
      processed: false,
    },
  ],
  currentStep: StepsEnum.start,
  isPending: false,
  ...generateControllerMethods(set, get),
}));

function generateControllerMethods(set: SetState, get: GetState): IControllerMethods {
  function setPending(value: boolean) {
    set(state => ({
      ...state,
      isPending: value,
    }));
  }

  function processStep(step: StepsEnum) {
    const steps = get().steps;
    const newSteps = steps?.map((item: Step) => {
      if (item.stepId === step) {
        return {
          ...item,
          processed: true,
        };
      }
      return item;
    });

    set(state => ({
      ...state,
      isPending: false,
      currentStep: ++step,
      steps: newSteps,
    }));
  }

  function startStep(step: StepsEnum) {
    setPending(true);
    processStep(step);
  }

  function ping() {
    setPending(true);
    setTimeout(() => {
      setPending(false);
    }, 4000);
  }

  return {
    ping,
    startStep,
    setPending,
    processStep,
  };
}

export default model;
