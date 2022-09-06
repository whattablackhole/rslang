import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";
import { store } from "../../services/store";

export class EnglishLevel {
  onEnglishLevelChange;
  constructor(onEnglishLevelChange: () => void) {
    this.onEnglishLevelChange = onEnglishLevelChange;
  }

  private isActiveGroup(index: number): string {
    return index === store.group ? "--active" : "";
  }

  drawEnglishLevel(): void {
    const localStoreApi = new LocalStoreAPI();
    const levelsEl = document.querySelector(
      ".textbook__level-block"
    ) as HTMLElement;
    const elementsArray = localStoreApi.checkAuthUser()
      ? ["A1", "A2", "B1", "B2", "C1", "C2", "HW"]
      : ["A1", "A2", "B1", "B2", "C1", "C2"];
    levelsEl.innerHTML = `
      <ul class="textbook__level">
      ${elementsArray
        .map(
          (element, index) =>
            `<li><button class="level__button ${this.isActiveGroup(
              index
            )}" data-group="${index}">${element}</button></li>`
        )
        .join("")}
      </ul>`;
  }
  listener(): void {
    const levelButtonsEl = document.querySelectorAll(".level__button");

    levelButtonsEl.forEach((levelButtonEl) =>
      levelButtonEl.addEventListener("click", (event) => {
        const group = Number((event.target as HTMLButtonElement).dataset.group);
        const activeGroup = document.querySelector(
          ".level__button.--active"
        ) as HTMLButtonElement;
        activeGroup.classList.remove("--active");
        levelButtonEl.classList.add("--active");
        store.group = group;
        void this.onEnglishLevelChange();
      })
    );
  }
}
