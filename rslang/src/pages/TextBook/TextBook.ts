import { EnglishLevel } from "../../components/EnglishLevel/EnglishLevel";
import { GameLinks } from "../../components/GameLinks/GameLinks";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { Words } from "../../components/Words/Words";
import { getWords } from "../../services/getWords";

import { store } from "../../services/store";
import { IWord } from "../../services/Types/Types";

export class TextBook {
  onReDraw = (): void => {
    if (Number(localStorage.getItem("group")) !== store.group) {
      store.activePage = 1;
      this.pagination.drawPagination();
      this.pagination.listener();
    }

    if (
      Number(localStorage.getItem("group")) !== store.group ||
      Number(localStorage.getItem("page")) !== store.activePage
    ) {
      Loading();
      void getWords().then((data: Array<IWord>) => this.words.drawWords(data));
      localStorage.setItem("page", String(store.activePage));
      localStorage.setItem("group", String(store.group));
    }
    const paginations = document.querySelectorAll(".pagination-content");
    if (store.group === 6) {
      paginations.forEach((pagination) => pagination.classList.add("hidden"));
    } else {
      paginations.forEach((pagination) =>
        pagination.classList.remove("hidden")
      );
    }
  };

  gameLinks = new GameLinks();
  englishLevel = new EnglishLevel(this.onReDraw);
  pagination = new Pagination(this.onReDraw);
  words = new Words(this.onReDraw);

  drawTextBookComponents(): void {
    const mainEl = document.querySelector("main") as HTMLElement;
    mainEl.innerHTML = `
      <div class="textbook__wrapper">
        <div class="pagination-up">
          <ul class="pagination-content"></ul>
        </div>
        <div class="textbook__block">
          <div class="textbook__items"></div>
          <div class="textbook__level-block"></div>
        </div>
        <div class="pagination-down">
          <ul class="pagination-content"></ul>
        </div>
      </div>
  `;
    Loading();
    this.gameLinks.drawGameLinks();

    this.pagination.drawPagination();
    this.pagination.listener();

    this.englishLevel.drawEnglishLevel();
    this.englishLevel.listener();

    void getWords().then((data: Array<IWord>) => {
      if (store.group === 6) {
        const paginations = document.querySelectorAll(".pagination-content");
        paginations.forEach((pagination) => pagination.classList.add("hidden"));
      }
      this.words.drawWords(data);
    });
  }
}
