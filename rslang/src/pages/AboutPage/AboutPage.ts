export class AboutPage {
    init = (): void => {
      this.drawPage();
    };
  
    drawPage = (): void => {
      const mainEl = document.querySelector("main") as HTMLElement;
      mainEl.className = "main";
      mainEl.innerHTML = `<div class="main__container about-container">
            <div class="main__title">
              <h1>Team №161</h1>
            </div>
            <div class="card__container">
            <div class="card__wrapper">
              <div class="card__avatar">
                <img class="about-avatar" src="./avatars/shumakavat.jpg" alt="tweetImg">
              </div>
              <div class="card__description">
                <h2 class="card__title">Konstantsin Shumak</h2>
                <p class="card__status">RS student</p>
                <p class="card__text">
                  Conducted the development of the pages of the textbook and dictionary. Made a card for words. And also "AudioCall" game
                </p>
                <div class="git__logo">
                <a href="https://github.com/Konstantsin-Shumak">
                  <svg class="git-blacked" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3">
                    </path>
                  </svg>
                </a>
                </div>
              </div>
            </div>
            <div class="card__wrapper">
              <div class="card__avatar">
                <img class="about-avatar" src="./avatars/whattaavatar.png" alt="tweetImg">
              </div>
              <div class="card__description">
                <h2 class="card__title">whattablackhole</h2>
                <p class="card__status">Team lead</p>
                <p class="card__text">Made codereviews, giving tips and answer related questions</p>
                <div class="git__logo">
                  <a href="https://github.com/whattablackhole">
                    <svg class="git-blacked" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3">
                      </path>
                    </svg>
                  </a> 
                </div>
              </div>
            </div>
            <div class="card__wrapper">
              <div class="card__avatar">
                <img class="about-avatar" src="./avatars/zzzhuchokavatar.jpg" alt="tweetImg">
              </div>
              <div class="card__description">
                <h2 class="card__title">zzzhuchok</h2>
                <p class="card__status">RS student</p>
                <p class="card__text">Front-end developer, participated in the development of the registration form, the Sprint game</p>
                <div class="git__logo">
                <a href="https://github.com/zzzhuchok">
                  <svg class="git-blacked" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3">
                    </path>
                  </svg>
                </a> 
              </div>
              </div>
            </div>
            <div class="card__wrapper">
              <div class="card__avatar">
                <img class="about-avatar" src="./avatars/whattaavatar.png" alt="tweetImg">
              </div>
              <div class="card__description">
                <h2 class="card__title">nvfnvm</h2>
                <p class="card__status">RS student</p>
                <p class="card__text">Did basic project settings, initial layout,  router setup, part of the main,statistics and about page, set backend</p>
                <div class="git__logo">
                <a href="https://github.com/nvfnvm">
                  <svg class="git-blacked" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3">
                    </path>
                  </svg>
                </a> 
              </div>
              </div>
            </div>
            </div>
          </div>
      `;
    };
  }
  