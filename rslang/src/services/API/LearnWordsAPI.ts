import { HttpError } from "../Errors/HttpErrors";
import {
  Auth,
  NewToken,
  Settings as Settings,
  Statistic,
  User,
  UserWord,
  IWord,
  IWordUser,
} from "../Types/Types";
import { LocalStoreAPI } from "./LocalStoreAPI";

export class LearnWordsAPI {
  url = "https://react-learnwords-rss.herokuapp.com";
  users = `${this.url}/users`;
  words = `${this.url}/words`;
  signIn = `${this.url}/signin`;
  localStore = new LocalStoreAPI();

  /* WORDS */
  getWordsAPI = async (group = 0, page = 0): Promise<Array<IWord>> => {
    const response = await fetch(`${this.words}?group=${group}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const words: Array<IWord> = (await response.json()) as Array<IWord>;
    return words;
  };

  getWordAPI = async (wordId: string): Promise<IWord> => {
    const response = await fetch(`${this.words}/${wordId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const word = (await response.json()) as IWord;
    return word;
  };

  /* =============================================================================== */

  /* USERS */
  createUserAPI = async (data: User): Promise<void> => {
    const response = await fetch(`${this.users}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    (await response.json()) as User;
  };

  getUserAPI = async (userId: string): Promise<User | undefined> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userData = (await response.json()) as User;
    return userData;
  };

  updateUserAPI = async (data: User, userId: string): Promise<User | void> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userNewData = (await response.json()) as User;
    return userNewData;
  };

  deleteUserAPI = async (userId: string): Promise<void> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }
  };

  getNewUserTokenAPI = async (userId: string): Promise<NewToken> => {
    const { refreshToken } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userData = (await response.json()) as NewToken;
    return userData;
  };

  /* =============================================================================== */
  /* Users/ Words */
  getAllUserWordsAPI = async (userId: string): Promise<UserWord[]> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userWords = (await response.json()) as UserWord[];
    return userWords;
  };

  createUserWordAPI = async (
    newWord: UserWord,
    userId: string,
    wordId: string
  ) => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newWord),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const userWord = (await response.json()) as UserWord;
    return userWord;
  };

  getUserWordAPI = async (
    userId: string,
    wordId: string
  ): Promise<UserWord | void> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const word = (await response?.json()) as UserWord;
    return word;
  };

  updateUserWordAPI = async (
    data: UserWord,
    userId: string,
    wordId: string
  ): Promise<UserWord> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const word = (await response?.json()) as UserWord;
    return word;
  };

  deleteUserWordAPI = async (userId: string, wordId: string): Promise<void> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  /* =============================================================================== */
  /* Users/AggregatedWords */
  getAllUserAggrWords = async (
    userId: string,
    filter: string,
    wordsPerPage?: string,
    group?: string,
    page?: string
  ) => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const groupValue = group ? `group=${group}` : "";
    const pageValue = page ? `&page=${page}` : "";
    const wordsPerPageValue = wordsPerPage
      ? `&wordsPerPage=${wordsPerPage}`
      : "";
    const response = await fetch(
      `${this.users}/${userId}/aggregatedWords?${groupValue}${pageValue}${wordsPerPageValue}&filter=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const aggrWords = (await response.json()) as IWordUser[];
    return aggrWords;
  };

  getUserAggrHardWords = async () => {
    const {userId} =this.localStore.getUser();
    const hardWords = await this.getAllUserAggrWords(userId, '{"userWord.difficulty": "hard"}', '3600');
    return hardWords[0].paginatedResults;
  }

  getUserAggrNoLearnedWords = async (level: number, page: number) => {
    const {userId} =this.localStore.getUser();
    const hardWords = await this.getAllUserAggrWords(
      userId, `
      {"$or":[
        {"$and":[{"group": ${level}, "page": ${page}, "userWord.difficulty": null}]},
        {"$and":[{"group": ${level}, "page": ${page}, "userWord.difficulty": "hard"}]}
      ]}
      `, '3600');
    return hardWords[0].paginatedResults;
  }

  /* =============================================================================== */
  /* Users/ Statistic */
  getUserStatisticAPI = async (userId: string): Promise<Statistic> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const statistic = (await response.json()) as Statistic;
    return statistic;
  };

  updateUserStatisticAPI = async (
    data: Statistic,
    userId: string
  ): Promise<Statistic> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const updateStat = (await response.json()) as Statistic;
    return updateStat;
  };

  /* =============================================================================== */

  /* Users/ Setting */
  getUserSettingsAPI = async (userId: string): Promise<Settings> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const settings = (await response.json()) as Settings;
    return settings;
  };

  updateUserSettingsAPI = async (
    data: Settings,
    userId: string
  ): Promise<Settings> => {
    /* UPDATE TOKEN */
    if (this.checkTokenLifetime()) {
      console.log("NEED UPDATE TOKEN");
      const { token, refreshToken } = await this.getNewUserTokenAPI(userId);
      this.localStore.updateUser(token, refreshToken, new Date());
    }

    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updateSettings = (await response.json()) as Settings;
    return updateSettings;
  };

  /* =============================================================================== */

  /* SIGN IN */
  loginUserAPI = async (data: User): Promise<Auth> => {
    const response = await fetch(`${this.signIn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const dataAuth = (await response.json()) as Auth;
    return dataAuth;
  };

  isWordUser = async (
    type: string,
    userId: string,
    wordId: string
  ): Promise<string> => {
    const data = await this.getAllUserWordsAPI(userId);

    return data.filter((element) => {
      return element.optional.id === wordId && element.difficulty === type;
    }).length > 0
      ? type
      : "";
  };

  checkTokenLifetime = (): boolean => {
    const time = this.localStore.getUser().date;
    const hourPassed = new Date(
      Date.now() - new Date(time).getTime()
    ).getHours();
    return hourPassed > 3;
  };
}
