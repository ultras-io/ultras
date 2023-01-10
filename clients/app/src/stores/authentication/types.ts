export type UserType = {
  id: ResourceIdentifier;
  phone?: string;
  email?: string;
  username: string;
  avatar?: string | null;
  fullname?: string | null;
  teams: Array<number>;
};

export interface IProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
  user: UserType | null;
}

export interface IMethods {
  authenticate: () => void;
  login: (token: string, user: UserType) => void;
  logout: () => void;
  addTeam: (teamId: number) => void;
  removeTeam: (teamId: number) => void;
  clearToken: () => void;
  updateUserField: (field: string, value: string) => void;
}

export interface IState extends IProps, IMethods {}
