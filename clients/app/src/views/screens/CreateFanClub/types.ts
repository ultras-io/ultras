import React from 'react';

export interface ICreateFanClubNavigationProps {
  route?: IRouteParams;
}

export interface IRouteParams {
  params: {
    teamId?: null | ResourceIdentifier;
    tabName?: null | string;
  };
}

export interface IScreenType {
  name: string;
  component: React.FC<any>;
  options?: any;
}
