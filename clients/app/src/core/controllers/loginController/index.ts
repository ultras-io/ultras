import {createModel, IModel} from 'core/services/model';
import loginSDK from 'core/sdk/loginSDK';

export type StateType = {
  isPending?: boolean;
  data?: any;
};

const model: IModel<Partial<StateType>> = createModel<Partial<StateType>>({
  isPending: false,
});

export const ping = (): void => {
  model.setState({
    isPending: true,
  });
  loginSDK.ping().then((data: any) => {
    setTimeout(() => {
      model.setState({
        isPending: false,
        data,
      });
    }, 3000);
  });
};

export default model;
