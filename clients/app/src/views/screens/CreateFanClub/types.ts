export interface ICreateFanClubNavigationProps {
  route?: IRouteParams;
}

export interface IRouteParams {
  params: {
    teamId?: null | ResourceIdentifier;
    tabName?: null | string;
  };
}
