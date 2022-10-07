export interface ICreateEventNavigationProps {
  route?: IRouteParams;
}

export interface IRouteParams {
  params: {
    matchId?: null | ResourceIdentifier;
    tabName?: null | string;
  };
}
