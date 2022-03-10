export type Step = {
  stepId: StepsEnum;
  processed: boolean;
};

export enum StepsEnum {
  start,
  second,
}

export type Steps = Step[];

export interface ILoginModel {
  steps: Steps;
  currentStep: StepsEnum;
  isPending: boolean;
  data?: any;
}

export interface IControllerMethods {
  setPending: (value: boolean) => void;
  processStep: (step: StepsEnum) => void;
  startStep: (step: StepsEnum) => void;
  ping: () => void;
}

export type GetState = () => ILoginModel;
export type SetState = (state: (state: ILoginModel) => ILoginModel) => ILoginModel;
