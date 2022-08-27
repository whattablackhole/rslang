import { LocalStorAPI } from "../API/LocalStorAPI";
import { Authentication } from "../Authentication/Authentication";

export class Header {

  authentication = new Authentication();
  localStor = new LocalStorAPI();

  drawHeader = ():void => {
    const header = document.createElement('header');
    header.className = 'header';
    header.setAttribute('id', 'header');
    header.innerHTML = this.getHeaderHtml();
    document.body.appendChild(header);
  }

  getHeaderHtml = (): string => {
    const {isAuth, name = 'anonymous'} = this.localStor.getUser();
    const userName = (isAuth) ? name : '';
    const userStateAuth = (isAuth) ? '' : 'hidden';
    const btnAuthState = (isAuth) ? 'hidden' : '';

    return `
      <div class="app_logo">
        <div class="img_app"></div>
      </div>

      <div class="header_menu">
        <div class="header_ennumeration">
          <nav>
            <ul class="menu_links">
              <li><a href="#">Учебники</a></li>
              <li><a href="#">Игры</a></li>
              <li><a href="#">Статистика</a></li>
              <li><a href="#">Настройка</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="app_login" id="blockHeaderkAuth">
        <div class="${userStateAuth}" id="userProfile" >${userName}</div>
        <button class="login-btn ${btnAuthState}" id="login">Вход</button>
        <button class="signIn-btn ${btnAuthState}" id="registration">Регистрация</button>
        <button class="login-btn ${userStateAuth}" type="button" id="logout" >Выйти</div>
      </div>

      <div class="menu_list">
        <div class="menu">
          <nav>
            <ul>
              <li><a href="#">Учебники</a></li>
              <li><a href="#">Игры</a></li>
              <li><a href="#">Статистика</a></li>
              <li><a href="#">Настройка</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <button>
        <div class="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    `;
  }



  /* HANDLERS */
  handleContainerAuthClick = (evt: Event) => {
    const elem = evt.target as HTMLButtonElement;

    if (elem.closest('#blockHeaderkAuth')) {
      if (elem.id === 'login') {
        (document.getElementById('formAuth') as HTMLElement).innerHTML = this.authentication.getFormHtml('login');
        document.getElementById('popupFormAuth')?.classList.remove('hidden');
      }

      if (elem.id === 'registration') {
        (document.getElementById('formAuth') as HTMLElement).innerHTML = this.authentication.getFormHtml('registration');
        document.getElementById('popupFormAuth')?.classList.remove('hidden');
      }

      if (elem.id === 'logout') {
        this.authentication.logoutUser();
      }
    }
  }

  listen() {
    document.getElementById('blockHeaderkAuth')?.addEventListener('click', this.handleContainerAuthClick);
  }
}