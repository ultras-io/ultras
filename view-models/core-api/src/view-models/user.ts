export type UserViewModel = ViewModel<{
  phone: Nullable<string>;
  email: Nullable<string>;
  username: Nullable<string>;
  avatar: Nullable<string>;
  fullname: Nullable<string>;
}>;

export type UsersViewModel = Array<UserViewModel>;
