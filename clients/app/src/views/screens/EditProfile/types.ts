export interface IEditProfileNavigationProps {
  route?: IRouteParams;
}

export interface IRouteParams {
  params: {
    teamId?: null | ResourceIdentifier;
    tabName?: null | string;
  };
}

export type FieldType = 'fullname' | 'phone' | 'email';

export interface IFieldProps {
  label: string;
  name: FieldType;
}
