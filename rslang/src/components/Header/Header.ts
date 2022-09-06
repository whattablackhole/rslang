import { TextBook } from "../../pages/TextBook/TextBook";
import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";
import { Authentication } from "../Authentication/Authentication";

export class Header {
  authentication = new Authentication();
  textbook = new TextBook();
  localStore = new LocalStoreAPI();

  init = (): void => {
    this.drawHeader();
    this.listen();
    this.authentication.init();
  };

  drawHeader = (): void => {
    const pageElement = document.querySelector("#page") as HTMLElement;
    const header = document.createElement("header");
    header.className = "header";
    header.setAttribute("id", "header");
    header.innerHTML = this.getHeaderHtml();
    pageElement.prepend(header);
  };

  getHeaderHtml = (): string => {
    const { isAuth, name = "anonymous" } = this.localStore.getUser();
    const userName = isAuth ? name : "";
    const userStateAuth = isAuth ? "" : "hidden";
    const btnAuthState = isAuth ? "hidden" : "";

    return `
      <div class="header__container">
        <a class="header__logo" href="/#/">
          <img src="./logo.svg" alt="logo" id="mainPage">
        </a>
        <nav class="header__nav" id="nav">
          <a class="header__nav-link" href="/#/books/" id="textBook">Учебник</a>
          <a class="header__nav-link" href="#/games/" id="miniGames">Мини-игры</a>
          <a class="header__nav-link" href="#/stat/" id="statistic">Статистика</a>
          <a class="header__nav-link" href="#/about/" id="team">О команде</a>
        </nav>
        <div class="header__auth" id="blockHeaderkAuth">
          <div class="header__user-name ${userStateAuth}" id="userProfile">${userName}</div>
          <button class="header__btn-login btn btn--primery ${btnAuthState}" id="login">Вход</button>
          <button class="header__btn-reg btn ${btnAuthState}" id="registration">Регистрация</button>
          <button class="header__btn-logout btn--img ${userStateAuth}" type="button" id="logout">
            <img src="./icons/logout.svg" alt="">
          </button>
        </div>
        <button class="burger" type="button" id="burger">
          <span>burger</span>
        </button>
      </div>
    `;
  };

  /* HANDLERS */
  handleHeaderClick = (evt: Event): void => {
    const elem = evt.target as HTMLButtonElement;

    if (elem.closest("#blockHeaderkAuth")) {
      if (elem.id === "login") {
        (document.getElementById("formAuth") as HTMLElement).innerHTML =
          this.authentication.getFormHtml("login");
        document.getElementById("popupFormAuth")?.classList.remove("hidden");
        document.body.classList.add('no-scroll');
      }

      if (elem.id === "registration") {
        (document.getElementById("formAuth") as HTMLElement).innerHTML =
          this.authentication.getFormHtml("registration");
        document.getElementById("popupFormAuth")?.classList.remove("hidden");
        document.body.classList.add('no-scroll');
      }

      if (elem.closest("#logout")?.id === "logout") {
        this.authentication.logoutUser();
        window.location.reload();
      }
    }
  };

  listen(): void {
    document
      .querySelector("#header")
      ?.addEventListener("click", this.handleHeaderClick);
  }
}
