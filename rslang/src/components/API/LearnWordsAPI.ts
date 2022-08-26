import { HttpError } from "../Errors/HttpErrors";
import { Auth, NewToken, Settings as Settings, Statistic, User, UserWord, Word } from "../Types/Types";
import { LocalStorAPI } from "./LocalStorAPI";

export class LearnWordsAPI {

  url = 'https://react-learnwords-rss.herokuapp.com';
  users = `${this.url}/users`;
  words = `${this.url}/words`;
  signIn = `${this.url}/signin`;
  localStor = new LocalStorAPI();


  /* WORDS */
  getWordsAPI = async (group = 0, page = 0): Promise<Word[]> => {
    const response = await fetch(`${this.words}?group=${group}&page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const words = await response.json() as Array<Word>;
    return words;
  }

  getWordAPI = async (wordId: string): Promise<Word> => {
    const response = await fetch(`${this.words}/${wordId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const word = await response.json() as Word;
    return word;
  }

  /* =============================================================================== */

  /* USERS */
  createUserAPI = async (data: User): Promise<void> => {
    const response = await fetch(`${this.users}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    await response.json() as User;
  }

  getUserAPI = async (userId: string): Promise<User | undefined> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if(!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userData = await response.json() as User;
    return userData;
  }

  updateUserAPI = async (data: User, userId: string): Promise<User> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const userNewData = await response.json() as User;
    return userNewData;
  }

  deleteUserAPI = async (userId: string): Promise<void> => {
    const {token} = this.localStor.getUser();
    await fetch(`${this.users}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getNewUserTokenAPI = async (userId: string): Promise<NewToken> => {
    const {refreshToken} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Accept': 'application/json',
      },
    });

    // TODO:
    // if(!response.ok) {
    //   throw new HttpError(response.status, response.statusText);
    // }

    throw new HttpError(403, 'blabla');

    const userData = await response.json() as NewToken;
    return userData;
  }

  /* =============================================================================== */
  /* Users/ Words */
  getAllUserWordsAPI = async (userId: string): Promise<UserWord[]> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const userWords = await response.json() as UserWord[];
    return userWords;
  }

  createUserWordAPI = async (newWord: UserWord, userId: string, wordId: string) => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newWord),
    });

    const userWord = await response.json() as UserWord;
    return userWord;
  }

  getUserWordAPI = async (userId: string, wordId: string): Promise<UserWord> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const word = await response.json() as UserWord;
    return word;
  }

  updateUserWordAPI = async (data: UserWord, userId: string, wordId: string): Promise<UserWord> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const word = await response.json() as UserWord;
    return word;
  }

  deleteUserWordAPI = async (userId: string, wordId: string): Promise<void> => {
    const {token} = this.localStor.getUser();
    await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  /* =============================================================================== */
  /* Users/AggregatedWords */
  getAllUserAggrWords = async (userId: string, wordsPerPage: string, filter: string, group?: string, page?: string) => {
    const {token} = this.localStor.getUser();
    const groupValue = (group) ? `group=${group}` : '';
    const pageValue = (page) ? `&page=${page}` : '';
    const response = await fetch(`${this.users}/${userId}/aggregatedWords?${groupValue}${pageValue}&wordsPerPage=${wordsPerPage}&filter=${filter}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const statistic = await response.json() as Statistic;
    return statistic;
  }



  /* =============================================================================== */
  /* Users/ Statistic */
  getUserStatisticAPI = async (userId: string): Promise<Statistic> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const statistic = await response.json() as Statistic;
    return statistic;
  }

  updateUserStatisticAPI = async (data: Statistic, userId: string): Promise<Statistic> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updateStat = await response.json() as Statistic;
    return updateStat;
  }

  /* =============================================================================== */

  /* Users/ Setting */
  getUserSettingsAPI = async (userId: string): Promise<Settings> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const settings = await response.json() as Settings;
    return settings;
  }

  updateUserSettingsAPI = async (data: Settings, userId: string): Promise<Settings> => {
    const {token} = this.localStor.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updateSettings = await response.json() as Settings;
    return updateSettings;
  }

  /* =============================================================================== */

  /* SIGN IN */
  loginUserAPI = async (data: User): Promise<Auth> => {
    const response = await fetch(`${this.signIn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const dataAuth = await response.json() as Auth;
    return dataAuth
  }
}