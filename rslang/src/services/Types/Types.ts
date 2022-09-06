export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface IWordUser extends IWord {
  paginatedResults: IWord[];
  totalCount: {
    count: number
  }[];
}

export interface UserWord {
  difficulty: string;
  optional: IWord;
}

export interface Statistic {
  learnedWords: number;
  optional: object;
}

export interface Settings {
  wordsPerDay: number;
  optional: object;
}

export interface User {
  name?: string;
  email: string;
  password: string;
  id?: string;
}

export interface Auth {
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  message?: string;
  isAuth?: boolean;
}

export interface NewToken {
  token: string;
  refreshToken: string;
}

export interface UserStore {
  isAuth: boolean;
  date: Date;
  name: string;
  token: string;
  refreshToken: string;
  userId: string;
}

export interface controlGameSprint {
  maxPage: number;
  maxWordsPage: number;
  countPage: number;
  countWord: number;
}