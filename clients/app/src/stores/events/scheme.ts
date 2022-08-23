import { SchemeInterface } from '../generateCRUD/types/scheme';

export const scheme: SchemeInterface = {
  title: {
    initialValue: '',
    // validate: (a, b) => {
    //   return ['error1', 'error2'];
    // },
    // processValue
  },
  isEndDateTime: { initialValue: false },
};
