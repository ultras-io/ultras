import { createModel, IModel } from 'services/model';
// import loginSDK from 'core/sdk/loginSDK';

export type Step = {
  stepId: StepsEnum;
  processed: boolean;
};

export enum StepsEnum {
  start,
  second,
}

export type Steps = Step[];

export type LoginModelState = {
  steps: Steps;
  currentStep: StepsEnum;
  isPending: boolean;
  data?: any;
};

const steps: Steps = [
  {
    stepId: StepsEnum.start,
    processed: false,
  },
  {
    stepId: StepsEnum.second,
    processed: false,
  },
];

const model: IModel<LoginModelState> = createModel<LoginModelState>({
  steps: steps,
  currentStep: StepsEnum.start,
  isPending: false,
});

function setPending(value: boolean) {
  model.setState({
    isPending: value,
  });
}

function processStep(step: StepsEnum) {
  const state = model.getState();
  const newSteps = state.steps?.map((item: Step) => {
    if (item.stepId === step) {
      return {
        ...item,
        processed: true,
      };
    }
    return item;
  });

  const newState: LoginModelState = {
    ...state,
    isPending: false,
    currentStep: ++step,
    steps: newSteps,
  };

  model.setState(newState);
}

function startStep(step: StepsEnum) {
  setPending(true);
  processStep(step);
}

function ping() {
  setPending(true);
  setTimeout(() => {
    model.setState({
      isPending: false,
    });
  }, 3000);
}

export { model, startStep, ping };
