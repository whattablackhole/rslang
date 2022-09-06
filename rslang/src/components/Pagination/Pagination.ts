import { store } from "../../services/store";

export class Pagination {
  onPageChange;
  constructor(onPageChange: () => void) {
    this.onPageChange = onPageChange;
  }
  createPagination(
    totalPages: number,
    page: number,
    paginationUpEl: HTMLElement,
    paginationDownEl: HTMLElement
  ): string {
    let liTag = "";
    let active;
    let prevPage: number = page - 1;
    let nextPage: number = page + 1;

    if (prevPage < 1) prevPage = 1;
    if (nextPage < 1) nextPage = 1;

    const isPrevDisable = page > 1 ? "" : "disable";
    liTag += `<li><button class="page-button previous-page ${isPrevDisable}"><</button></li>`;
    if (page > 2) {
      liTag += `<li><button class="page-button current-page">1</button></li>`;
      if (page > 3) {
        liTag += `<li><button class="page-button dots">...</button></li>`;
      }
    }
    if (
      page === totalPages ||
      page === totalPages - 1 ||
      page === totalPages - 2
    ) {
      prevPage = 26;
    }

    if (page === 1 || page === 2 || page === 3) {
      nextPage = 5;
    }

    for (let plength = prevPage; plength <= nextPage; plength++) {
      if (plength > totalPages) {
        continue;
      }
      if (plength === 0) {
        plength = plength + 1;
      }
      active = store.activePage === plength ? "--active" : "";
      liTag += `<li><button class="page-button current-page ${active}">${plength}</button></li>
      `;
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTag += `<li><button class="page-button dots">...</button></li>`;
      }
      liTag += `<li><button class="page-button current-page">${totalPages}</button></li>`;
    }
    const isNextDisable = page < totalPages ? "" : "disable";
    liTag += `<li><button class="page-button next-page ${isNextDisable}">></button></li>`;
    paginationUpEl.innerHTML = liTag;
    paginationDownEl.innerHTML = liTag;
    return liTag;
  }

  drawPagination(): void {
    const paginationUpEl = document.querySelector(
      ".pagination-up ul"
    ) as HTMLElement;
    const paginationDownEl = document.querySelector(
      ".pagination-down ul"
    ) as HTMLElement;
    paginationUpEl.innerHTML = this.createPagination(
      store.totalPage,
      store.activePage,
      paginationUpEl,
      paginationDownEl
    );
  }

  listener(): void {
    const paginationButtons = document.querySelectorAll(
      ".page-button:not(.dots)"
    );

    paginationButtons.forEach((paginationButton) => {
      paginationButton.addEventListener("click", (event) => {
        const button = event.target as HTMLButtonElement;

        if (button.classList.contains("previous-page")) {
          if (store.activePage > 2) store.activePage = store.activePage - 1;
          else store.activePage = 1;
        } else if (button.classList.contains("next-page")) {
          if (store.activePage < 29) store.activePage = store.activePage + 1;
          else store.activePage = 30;
        } else {
          store.activePage = Number(button.textContent);
        }
        if (!button.classList.contains("disable")) {
          void this.onPageChange();
        }
        this.drawPagination();
        this.listener();
      });
    });
  }
}
