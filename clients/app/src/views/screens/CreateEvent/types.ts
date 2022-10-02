import React from 'react';

export interface ICreateEventNavigationProps {
  route?: IRouteParams;
}

export interface IRouteParams {
  params: {
    matchId?: null | ResourceIdentifier;
    tabName?: null | string;
  };
}

export interface IScreenType {
  name: string;
  component: React.FC<any>;
  options?: any;
}
