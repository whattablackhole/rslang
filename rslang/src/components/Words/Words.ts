import { LearnWordsAPI } from "../../services/API/LearnWordsAPI";
import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";
import { store } from "../../services/store";
import { IWord, UserWord } from "../../services/Types/Types";
import { AudioComponents } from "../Audio/AudioComponents";

export class Words {
  learnWordsApi = new LearnWordsAPI();
  localStoreApi = new LocalStoreAPI();

  isUserWord = (
    userWords: Array<UserWord>,
    wordId: string,
    type: string
  ): string => {
    console;
    return userWords.filter((element) => {
      return element.optional.id === wordId && element.difficulty === type;
    }).length > 0
      ? type
      : "";
  };

  drawWords(data: Array<IWord>, userWords: Array<UserWord> = []): void {
    const textbookItems = document.querySelector(
      ".textbook__items"
    ) as HTMLElement;

    textbookItems.innerHTML = "";
    data.map((item: IWord) => {
      if (!item) {
        return;
      }
      const itemEl = document.createElement("div") as HTMLElement;
      const audio = new AudioComponents();
      itemEl.setAttribute("id", "item-" + item.id);
      itemEl.classList.add("item");
      itemEl.innerHTML = `
        <div class="item__image-container">
          <img src="${this.learnWordsApi.url}/${item.image}" alt="photo:${
        item.word
      }">
        </div>
        <div class="item__info">
          <div class="info__header">
            <span class="item__header__line"></span>
            <div class="item__header__content">
              <div class="item__title-transcription-block">
                <span class="title-transcription-block__title">${
                  item.word
                }</span>
                <span class="title-transcription-block__transcription">${
                  item.transcription
                }</span>
              </div>
              <span class="title-transcription-block__translate">${
                item.wordTranslate
              }</span>
            </div>
          </div>
          <div class="item__example">
            <div class="sentence">${item.textExample}</div>
            <div class="sentence_translate">${item.textExampleTranslate}</div>
          </div>
          <div class="item__meaning">
            <div class="sentence">${item.textMeaning}</div>
            <div class="sentence_translate">${item.textMeaningTranslate}</div>
          </div>
        </div>
        <div class="item__last-column">
          <audio id="audio-${item.id}" src="${this.learnWordsApi.url}/${
        item.audio
      }"></audio>
      ${
        this.localStoreApi.checkAuthUser()
          ? `
      <div class="counter-audio__block">
        <div class="item__counter-word">
          <div class="counter-word__correct">2</div>  
          <div class="counter-word__mistake">6</div>  
        </div>
        <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
      </div>
      <div class="last-column__buttons">
        <button id ="${
          item.id
        }-hard-button" class="item__hard-button">Сложно</button>
        <button id="${
          item.id
        }-learn-button" class="item__learn-button">Изучено</button>
      </div>
      `
          : `
      <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
      `
      }
      </div>
    `;
      textbookItems.appendChild(itemEl);
      this.listener(userWords, item.id, item, audio);
    });
  }

  private listener(
    userWords: Array<UserWord>,
    id: string,
    item: IWord,
    audioComponent: AudioComponents
  ) {
    if (this.localStoreApi.checkAuthUser()) {
      const hardButton = document.getElementById(
        `${id}-hard-button`
      ) as HTMLButtonElement;
      const learnButton = document.getElementById(
        `${id}-learn-button`
      ) as HTMLButtonElement;

      hardButton.classList.remove("disable");
      learnButton.classList.remove("disable");

      const itemElement = document.getElementById(
        "item-" + item.id
      ) as HTMLElement;

      const { userId } = this.localStoreApi.getUser();

      this.checkWord(
        userWords,
        "hard",
        userId,
        item.id,
        itemElement,
        hardButton
      );
      this.checkWord(
        userWords,
        "learn",
        userId,
        item.id,
        itemElement,
        learnButton
      );

      hardButton?.addEventListener("click", (event) => {
        this.obButtonsClick("hard", userId, id, item, itemElement, event);
      });

      learnButton?.addEventListener("click", (event) => {
        this.obButtonsClick("learn", userId, id, item, itemElement, event);
      });
    }
    audioComponent.isAudioIconClick(item.id, this.learnWordsApi.url, item);
  }

  private checkWord(
    userWords: Array<UserWord>,
    type: string,
    userId: string,
    id: string,
    itemElement: HTMLElement,
    button: HTMLButtonElement
  ) {
    if (this.isUserWord(userWords, id, type)) {
      itemElement.classList.add(type);
      button.classList.add("disable");
      button.disabled = true;
    }
    if (type === "hard" && store.group === 6) {
      button.classList.remove("disable");
      button.disabled = false;
      button.textContent = "Очистить";
    }
    this.checkAllWords();
  }

  private obButtonsClick(
    type: string,
    userId: string,
    id: string,
    item: IWord,
    itemElement: HTMLElement,
    event: Event
  ) {
    if ((event.target as HTMLButtonElement).textContent === "Очистить")
      void this.learnWordsApi.deleteUserWordAPI(userId, item.id);
    else if (
      itemElement.classList.contains("hard") ||
      itemElement.classList.contains("learn")
    ) {
      void this.learnWordsApi.updateUserWordAPI(
        {
          difficulty: type,
          optional: {
            ...item,
          },
        },
        userId,
        id
      );
    } else {
      void this.learnWordsApi.createUserWordAPI(
        {
          difficulty: type,
          optional: { ...item },
        },
        userId,
        id
      );
    }

    this.switchButtonClassList(itemElement, type, item.id);
  }
  private switchButtonClassList(
    itemElement: HTMLElement,
    type: string,
    id: string
  ) {
    const hardButton = document.getElementById(
      `${id}-hard-button`
    ) as HTMLButtonElement;
    const learnButton = document.getElementById(
      `${id}-learn-button`
    ) as HTMLButtonElement;

    if (type === "hard") {
      itemElement.classList.remove("learn");
      itemElement.classList.add("hard");
      hardButton.classList.add("disable");
      hardButton.disabled = true;
      learnButton.classList.remove("disable");
      learnButton.disabled = false;
    } else {
      itemElement.classList.remove("hard");
      itemElement.classList.add("learn");
      learnButton.classList.add("disable");
      learnButton.disabled = true;
      hardButton.classList.remove("disable");
      hardButton.disabled = false;
    }
    if (store.group > 5) {
      itemElement.remove();
    }
    this.checkAllWords();
  }
  private checkAllWords() {
    const wordsBlock = document.querySelector(
      ".textbook__items"
    ) as HTMLElement;
    const hardWordsOnPage = document.querySelectorAll(".hard");
    const learnWordsOnPage = document.querySelectorAll(".learn");
    const audioLink = document.querySelector(
      ".gamelinks-block__audiogame-block"
    ) as HTMLLinkElement;
    const sprintLink = document.querySelector(
      ".gamelinks-block__sprintgame-block"
    ) as HTMLLinkElement;

    if (hardWordsOnPage.length === 20) {
      wordsBlock.classList.remove("learns");
      wordsBlock.classList.add("hards");
    } else if (learnWordsOnPage.length === 20) {
      sprintLink.classList.add("disable");
      audioLink.classList.add("disable");
      sprintLink.disabled = true;
      audioLink.disabled = true;
      wordsBlock.classList.remove("hards");
      wordsBlock.classList.add("learns");
    } else {
      wordsBlock.classList.remove("learns", "hards");
      sprintLink.classList.remove("disable");
      audioLink.classList.remove("disable");
      sprintLink.disabled = true;
      audioLink.disabled = true;
    }
  }
}
