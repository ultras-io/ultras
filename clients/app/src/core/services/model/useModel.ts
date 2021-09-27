import React from 'react';
import {IModel} from './types';

function useModel<T>(model: IModel<T>): T {
  const [state, setState] = React.useState<T>(model.getState());

  React.useEffect(() => {
    const initSubscription = model.subscribe('INIT', () =>
      setState(model.getState()),
    );
    const updateSubscription = model.subscribe('UPDATE', () =>
      setState(model.getState()),
    );

    return () => {
      initSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      model.destroy();
    };
  }, [model]);

  return state;
}

export default useModel;
