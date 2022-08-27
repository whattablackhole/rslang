/* eslint-disable @typescript-eslint/no-misused-promises */
import { LearnWordsAPI } from "../API/LearnWordsAPI";
import { LocalStorAPI } from "../API/LocalStorAPI";
import { HttpError } from "../Errors/HttpErrors";

export class Authentication {
  localStor = new LocalStorAPI();
  learnWordsAPI = new LearnWordsAPI();

  drawLoginForm(): void {
    const div = document.createElement('div');
    div.className = 'popup__form-authentication hidden';
    div.setAttribute('id', 'popupFormAuth');
    div.innerHTML = this.getFormHtml();
    document.body.appendChild(div);
  }

  getFormHtml = (typeForm: 'registration' | 'login' = 'login'): string => {
    const formTitle = (typeForm === 'login') ? 'Вход' : 'Создать аккаунт';
    const inputNameState = (typeForm === 'login') ? 'hidden' : '';
    const btnId = (typeForm === 'login') ? 'btnLog' : 'btnReg';
    const btnText = (typeForm === 'login') ? 'Войти' : 'Регистрация';
    const linkId = (typeForm === 'login') ? 'linkToCreateAccount' : 'linkToLogin';
    const linkText = (typeForm === 'login') ? 'Регистрация' : 'Вход';
    const prevLinkText = (typeForm === 'login') ? 'Нет аккаунта?' : 'Есть аккаунт?';

    return `
      <form class="form" action="/" id="formAuth">
        <h2 class="form__title">${formTitle}</h2>
        <div class="form__input-group">
            <input class="form__input ${inputNameState}" type="text" data-type-input="name" placeholder="name">
            <div class="form__input-error hidden">Некорректное Имя</div>
        </div>
        <div class="form__input-group">
          <input class="form__input" type="text" data-type-input="email" placeholder="email">
          <div class="form__input-error hidden">Некорректный email</div>
        </div>
        <div class="form__input-group">
          <input class="form__input" type="password" data-type-input="password" placeholder="password">
          <div class="form__input-error hidden">Минимальная длина пароля: 8 символов</div>
        </div>
        <div class="form__error hidden" id="fieldErrorForm"></div>
        <button class="form__btn" type="submit" disabled id="${btnId}">${btnText}</button>
        <p class="form__text">
          ${prevLinkText} <a class="form__link form__link--bold" href="./" id="${linkId}">${linkText}</a>
        </p>
        <div class="form__btn-closed"></div>
      </form>
    `;
  }

  /* Validation Forms */
  validationName = (name: string): boolean => name.length > 0;
  validationEmail = (email: string): boolean => /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email);
  validationPassword = (pass: string): boolean => pass.length > 7;
  validationAllInput = (res: boolean, elem: HTMLInputElement): void => {
    const form = document.querySelector('.form') as HTMLFormElement;
    const btn = form.querySelector('.form__btn') as HTMLButtonElement;

    if (!res) {
      elem.nextElementSibling?.classList.remove('hidden');
      elem.classList.add('form__input--error');
      btn.disabled = true;
      return;
    }

    elem.nextElementSibling?.classList.add('hidden');
    elem.classList.remove('form__input--error');
    const arrAllInputActiveForm = form?.querySelectorAll('.form__input:not(.hidden) + .form__input-error') || [];
    const result = [...arrAllInputActiveForm].every((el) => {
      const prevEl = el.previousElementSibling as HTMLInputElement;
      return el.classList.contains('hidden') && prevEl.value.length > 0;
    });

    document.getElementById('fieldErrorForm')?.classList.add('hidden');

    if (result) btn.disabled = false;
  }

  registerUser = async (name: string, email: string, password: string): Promise<void> => {
    try {
      await this.learnWordsAPI.createUserAPI({name, email, password});
      await this.loginUser(email, password);
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.statusCode === 417) {
          const divErrorText = document.getElementById('fieldErrorForm');
          if (divErrorText) {
            divErrorText.textContent = 'Данный email уже зарегистрирован';
            divErrorText.classList.remove('hidden');
          }
        }
      }
    }
  }

  loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const userData = {...await this.learnWordsAPI.loginUserAPI({email, password})};

      if (userData?.message === 'Authenticated') {
        document.getElementById('popupFormAuth')?.classList.add('hidden');
        this.localStor.setUser(userData);

        // update header
        (document.getElementById('userProfile') as HTMLElement).innerHTML = userData.name;
        (document.getElementById('userProfile') as HTMLElement).classList.remove('hidden');
        (document.getElementById('logout') as HTMLButtonElement).classList.remove('hidden');

        (document.getElementById('login') as HTMLButtonElement).classList.add('hidden');
        (document.getElementById('registration') as HTMLButtonElement).classList.add('hidden');
      }
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.statusCode === 404) {
          const divErrorText = document.getElementById('fieldErrorForm');
          if (divErrorText) {
            divErrorText.textContent = 'Данный email не зарегистрирован';
            divErrorText.classList.remove('hidden');
          }
        }

        if (err.statusCode === 403) {
          const divErrorText = document.getElementById('fieldErrorForm');
          if (divErrorText) {
            divErrorText.textContent = 'Некорректный ввод email/ password';
            divErrorText.classList.remove('hidden');
          }
        }
      }
    }
  }

  logoutUser = () => {
    const { name } = this.localStor.getUser();

    if (window.confirm(`${name}, Вы точно хотите выйти?`)) {
      this.localStor.deleteUser();

      // update header
      (document.getElementById('userProfile') as HTMLElement).classList.add('hidden');
      (document.getElementById('logout') as HTMLButtonElement).classList.add('hidden');

      (document.getElementById('login') as HTMLButtonElement).classList.remove('hidden');
      (document.getElementById('registration') as HTMLButtonElement).classList.remove('hidden');
    }
  }

  updateUserToken = async (userId: string): Promise<void> => {
    try {
      const { token, refreshToken } = await this.learnWordsAPI.getNewUserTokenAPI(userId);
      this.localStor.updateUser(token, refreshToken);
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.statusCode === 403) {
          console.log('aaaaaaaaaaa: Access token is missing, expired or invalid...', err.status);
          }
        }
    }
  }


  /* HANDLERS */
  handleFormClick = async (evt: Event) => {
    evt.preventDefault();
    const elem = evt.target as HTMLElement;
    const form = elem.closest('.form') as HTMLElement;
    const name = (document.querySelector('[data-type-input="name"]') as HTMLInputElement);

    if (elem.classList.contains('form__btn-closed')) {
      document.querySelector('.popup__form-authentication')?.classList.add('hidden');
    }

    if (elem.classList.contains('form__link')) {
      if (elem.id === 'linkToCreateAccount') form.innerHTML = this.getFormHtml('registration');
      if (elem.id === 'linkToLogin') form.innerHTML = this.getFormHtml('login');
    }

    if (elem.classList.contains('form__btn')) {
      const email = (document.querySelector('[data-type-input="email"]') as HTMLInputElement)?.value;
      const pass = (document.querySelector('[data-type-input="password"]') as HTMLInputElement)?.value;
      const btn = elem as HTMLButtonElement;
      const nameUser = name.value || 'Некто';

      if (btn.id === 'btnReg') {
        btn.disabled = true;
        btn.innerText = 'Ожидайте...';

        document.querySelector('.form')?.removeEventListener('click', this.handleFormClick);
        await this.registerUser(nameUser, email, pass).catch((err: Error) => console.log(err.message));
        document.querySelector('.form')?.addEventListener('click', this.handleFormClick);


        btn.innerText = 'Регистрация';
        btn.disabled = false;
      }

      if (btn.id === 'btnLog') {
        btn.disabled = true;
        btn.innerText = 'Ожидайте...';

        document.querySelector('.form')?.removeEventListener('click', this.handleFormClick);
        await this.loginUser(email, pass).catch((err: Error) => console.log(err.message));
        document.querySelector('.form')?.addEventListener('click', this.handleFormClick);

        btn.innerText = 'Войти';
        btn.disabled = false;
      }
    }
  }

  handleContainerFormBlur = (e: Event) => {
    const elem = e.target as HTMLInputElement;
    const value = elem.value;

    if (elem.dataset.typeInput === 'name') {
      const res = this.validationName(elem.value);
      this.validationAllInput(res, elem);
    }

    if (elem.dataset.typeInput === 'email') {
      const res = this.validationEmail(value);
      this.validationAllInput(res, elem);
    }

    if (elem.dataset.typeInput === 'password') {
      const res = this.validationPassword(value);
      this.validationAllInput(res, elem);
    }
  }


  /* ADD Handler */
  listen(): void {
    document.querySelector('.form')?.addEventListener('click', this.handleFormClick);
    document.querySelector('.form')?.addEventListener('input', this.handleContainerFormBlur);
  }
}
