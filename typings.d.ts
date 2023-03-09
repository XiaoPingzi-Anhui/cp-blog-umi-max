import '@umijs/max/typings';
declare global {
  interface InitialState {
    name: string;
    userInfo: API.UserInfo;
  }
}
