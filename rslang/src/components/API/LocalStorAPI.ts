import { Auth, UserStore } from "../Types/Types";

export class LocalStorAPI {

  /* COMMON METHODS */
  getValue = <T>(key: string) => {
    return (JSON.parse(localStorage.getItem(key) as string)) as T;
  }

  setValue = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    return this.getValue(key);
  }

  // ==================================================================

  /* USER METHODS */
  setUser = (userData: Auth): void => {
    const {name, token, refreshToken, userId} = userData;
    this.setValue('user', {isAuth: true, name, token, refreshToken, userId});
  }

  getUser = (): UserStore => {
    const userObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    return (userObj) ? userObj : {isAuth: false, name: '', token: '', refreshToken: '', userId: ''};
  }

  updateUser = (newToken: string, newRefrashToken: string): void => {
    const userObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    userObj.token = newToken;
    userObj.refreshToken = newRefrashToken;
    this.setValue('user', userObj);
  }

  deleteUser = ():void => {
    let userDataObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    userDataObj = {isAuth: false, name: '', token: '', refreshToken: '', userId: ''};
    this.setValue('user', userDataObj);
  }

  checkAuthUser = (): boolean => {
    const {isAuth} = this.getUser();
    return !!isAuth;
  }
}