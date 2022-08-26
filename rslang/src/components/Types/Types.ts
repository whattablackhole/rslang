export interface Word {
  id:	string;
  group:	number;
  page:	number;
  word:	string;
  image:	string;
  audio:	string;
  audioMeaning:	string;
  audioExample:	string;
  textMeaning:	string;
  textExample:	string;
  transcription:	string;
  wordTranslate:	string;
  textMeaningTranslate:	string;
  textExampleTranslate:	string;
}

export interface UserWord {
  difficulty:	string;
  optional: object;
}

export interface Statistic {
  learnedWords: number;
  optional:	object;
}

export interface Settings {
  wordsPerDay:	number;
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
  name: string;
  token: string;
  refreshToken: string;
  userId: string;
}