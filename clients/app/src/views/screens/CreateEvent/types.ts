import React from 'react';

export interface ICreateEventWrapperProps {
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

export interface IBackButtonComponentProps {
  action?: 'back' | 'close';
  type?: 'text' | 'icon' | 'both';
  position?: 'left' | 'right';
}
