import { REACT_APP_NODE_ENV } from '@env';

interface ISdkBuilder {
  new (mode: 'staging' | 'production' | 'dev'): any;
}

function makeSdkInstance(SdkBuilderClass: ISdkBuilder) {
  if (REACT_APP_NODE_ENV === 'staging') {
    return new SdkBuilderClass('staging');
  }

  if (REACT_APP_NODE_ENV === 'production') {
    return new SdkBuilderClass('production');
  }

  return new SdkBuilderClass('dev');
}

export default makeSdkInstance;
