import { Auth, UserStore } from "../Types/Types";

export class LocalStoreAPI {

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
    this.setValue('user', {isAuth: true, date: new Date(), name, token, refreshToken, userId});
  }

  getUser = (): UserStore => {
    const userObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    return (userObj) ? userObj : {isAuth: false, date: new Date(), name: '', token: '', refreshToken: '', userId: ''};
  }

  updateUser = (newToken: string, newRefrashToken: string, date: Date): void => {
    const userObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    userObj.token = newToken;
    userObj.refreshToken = newRefrashToken;
    userObj.date = date;
    this.setValue('user', userObj);
  }

  deleteUser = ():void => {
    let userDataObj = JSON.parse(localStorage.getItem('user') as string) as UserStore;
    userDataObj = {isAuth: false, date: new Date(), name: '', token: '', refreshToken: '', userId: ''};
    this.setValue('user', userDataObj);
  }

  checkAuthUser = (): boolean => {
    const {isAuth} = this.getUser();
    return !!isAuth;
  }
}