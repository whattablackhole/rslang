import { LearnWordsAPI } from "./API/LearnWordsAPI";
import { LocalStoreAPI } from "./API/LocalStoreAPI";
import { store } from "./store";
import { IWord } from "./Types/Types";

export const getWords = async (): Promise<Array<IWord>> => {
  const learnword = new LearnWordsAPI();
  const localStoreApi = new LocalStoreAPI();

  if (store.group === 6) {
    const { userId } = localStoreApi.getUser();

    return learnword.getAllUserWordsAPI(userId).then((data) => {
      const hardWords = data
        .filter((element) => {
          if (element.difficulty === "hard") return element.optional;
        })
        ?.map((element) => element.optional);
      return hardWords;
    });
  } else {
    return learnword.getWordsAPI(store.group, store.activePage - 1);
  }
};
