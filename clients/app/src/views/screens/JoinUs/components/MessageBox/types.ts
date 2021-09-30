import {Steps, StepsEnum} from 'core/controllers/loginController';

export type MessageBoxProps = {
  steps: Steps;
  currentStep: StepsEnum;
};
