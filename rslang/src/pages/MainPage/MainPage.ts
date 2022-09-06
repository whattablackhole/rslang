export class MainPage {

  init = (): void => {
    this.drawPage();
  }

  drawPage = (): void => {
    const pageElement = document.querySelector('#page') as HTMLElement;
    const mainEl = document.createElement("main");
    mainEl.className = "main";
    mainEl.innerHTML = `<div class="main__container">
      <div class="main__item left-main">
        <div class="left-main__top">
          <h1 class="left-main__title">STUDY ENGLISH</h1>
          <div class="left-main__text">
            Нескучное онлайн-обучение английскому языку с помощью игр и интересных заданий в любое удобное для вас время
          </div>
          <a class="left-main__button btn btn--primery btn--big" href="/#/books/">Начать обучение</a>
        </div>
        <div class="left-main__bottom">
          <div class="left-main__achievements-block">
            <div class="achievements__item achievements__left">
              <div class="achievements__title">28k+</div>
              <div class="achievements__text">активных пользователей платформы</div>
            </div>
            <div class="achievements__item achievements__right">
              <div class="achievements__title">5 лет</div>
              <div class="achievements__text">успешно обучаем языку</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main__item right-main">
        <img class="right-main__img-block" src="./main_bg.png">
      </div>
      </div>
  `
  pageElement.append(mainEl);
  }
}
