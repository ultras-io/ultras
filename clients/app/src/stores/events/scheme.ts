import { SchemeInterface } from '../generateCRUD/types/scheme';

interface DataTypeInterface {
  title: string;
  isEndDateTime: boolean;
}

export const scheme: SchemeInterface<DataTypeInterface> = {
  title: {
    initialValue: '',
    // validate: (a, b) => {
    //   return ['error1', 'error2'];
    // },
    // processValue
  },
  isEndDateTime: { initialValue: false },
};
