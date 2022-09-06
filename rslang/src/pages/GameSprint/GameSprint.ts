import { Loading } from '../../components/Loading/Loading';
import { LearnWordsAPI } from '../../services/API/LearnWordsAPI';
import { LocalStoreAPI } from '../../services/API/LocalStoreAPI';
import { controlGameSprint, IWord } from '../../services/Types/Types';

export class SprintGame {

  arrWords: IWord[][];
  currentWordTranslateDisplay: string;
  arrCorrectAnswers: IWord[];
  arrIncorrectAnswers: IWord[];
  timerFinish: number;
  timerClock: number;
  control: controlGameSprint;
  countCorrectAnswers: number;
  points: number;

  learnWords = new LearnWordsAPI();
  localStore = new LocalStoreAPI();

  constructor(private initialValue: {state: 'games' | 'textbook', level: number, page?: number}) {
    this.initialValue = initialValue;
    this.control = {
      maxPage: 0,
      maxWordsPage: 0,
      countPage: 0,
      countWord: 0,
    }

    this.arrWords = [];
    this.currentWordTranslateDisplay = '';
    this.countCorrectAnswers = 0;
    this.points = 0;

    this.timerFinish = 0;
    this.timerClock = 0;

    this.arrCorrectAnswers = [];
    this.arrIncorrectAnswers = [];
  }

  async init() {
    const main = document.querySelector('main') as HTMLElement;

    Loading(main);

    this.arrWords = (this.initialValue.state === 'games') ?
      await this.getWordsFromCommonBase(this.initialValue.level) :
      await this.getWordsFromTextbook(this.initialValue.level, this.initialValue.page);

    if (!this.arrWords[0].length) {
      alert('На данной странице все слова изучены');
      window.history.back();
      return
    }

    this.control.maxPage = this.arrWords.length;
    this.control.maxWordsPage = this.arrWords[0].length;

    this.drawPage();
    this.listen();
    this.startClockUpdate(60);
    this.startTimeGame(60);
  }


  /* DRAW & REDRAW*/
  drawPage() {
    (document.querySelector('main') as HTMLElement).innerHTML = `
      <section class="game-sprint" id="gameSprint">
        <div class="game-sprint__wrapper">
          <div class="game-sprint__card-score" id="sprintPoints">0</div>
          <div class="game-sprint__card-word">
            <div class="card-word__top">
              <div class="card-word__progress">
                <span data-progress="0">1</span>
                <span data-progress="1">2</span>
                <span data-progress="2">3</span>
              </div>
              <img src="./sprint_img-card.png" alt="cat">
            </div>
            <div class="card-word__bottom">
              ${this.getHTMLCard()}
            </div>
          </div>
         </div>
        <div class="game-sprint__timer timer">
          <div class="timer__count">60</div>
        </div>
        <button class="game-sprint__close" id="btnCloseSprint">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.1818L20.7273 22.9091C21.3298 23.5116 22.3066 23.5116 22.9091 22.9091C23.5116 22.3066 23.5116 21.3298 22.9091 20.7273L14.1818 12L22.9091 3.27273C23.5116 2.67023 23.5116 1.6934 22.9091 1.09091C22.3066 0.488417 21.3298 0.488416 20.7273 1.09091L12 9.81818L3.27273 1.09091C2.67023 0.488417 1.6934 0.488417 1.09091 1.09091C0.488417 1.6934 0.488416 2.67023 1.09091 3.27273L9.81818 12L1.09091 20.7273C0.488416 21.3298 0.488417 22.3066 1.09091 22.9091C1.6934 23.5116 2.67023 23.5116 3.27273 22.9091L12 14.1818Z"/>
          </svg>
        </button>

        <div class="game-sprint__popup hidden">
          <div class="popup-sprint">
            <div class="popup-sprint__top">
              <div class="popup-sprint__top-left">
                <img src="./sprint_result.png" alt="cat">
              </div>
              <div class="popup-sprint__top-right">
                <h3 class="popup-sprint__title">Ваш результат:</h3>
                <div class="popup-sprint__subtitle"><span id="sprintTotalPoints">0</span> очков</div>
              </div>
            </div>

            <div class="popup-sprint__middle">
              <div class="popup-sprint__answers popup-sprint__incorrect-answers" id="listIncorrectAnswers">
                <div class="popup-sprint__cnt popup-sprint__cnt--incorrect">
                  ОШИБОК: <span id="sprintCntIncorrect">0</span>
                </div>
              </div>
              <div class="popup-sprint__answers popup-sprint__correct-answers" id="listCorrectAnswers">
                <div class="popup-sprint__cnt popup-sprint__cnt--correct">
                  ВЕРНО: <span id="sprintCntCorrect">0</span>
                </div>
              </div>
            </div>

            <div class="popup-sprint__bottom">
              <div class="popup-sprint__btns">
                <button class="popup-sprint__btn-relay btn btn--primery" id="sprintStartAgain">Начать заново</button>
                <button class="popup-sprint__btn-exit btn" id="backToGames">Вернуться назад</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  drawCardWord() {
    (document.querySelector('.card-word__bottom') as HTMLElement).innerHTML = this.getHTMLCard();
    this.listen();
  }

  private drawAnswersInPopup() {
    const correctAnswers = this.getResultAnswers('correct');
    const incorrectAnswers = this.getResultAnswers('incorrect');

    (document.querySelector('#sprintTotalPoints') as HTMLElement).textContent = `${this.points}`;

    (document.querySelector('#sprintCntIncorrect') as HTMLElement).innerHTML = `${this.arrIncorrectAnswers.length}`;
    (document.querySelector('#sprintCntCorrect') as HTMLElement).innerHTML = `${this.arrCorrectAnswers.length}`;

    (document.querySelector('#listCorrectAnswers') as HTMLElement).appendChild(correctAnswers);
    (document.querySelector('#listIncorrectAnswers') as HTMLElement).appendChild(incorrectAnswers);
  }

  private redrawPoints() {
    const points = document.querySelector('#sprintPoints') as HTMLElement;
    points.innerText = `${this.points}`;
  }
  /* ======================================================================================================== */

  /* GET SOMETHING*/
  private getHTMLCard() {
    const {countPage, countWord} = this.control;
    const {word, wordTranslate: translateTrue} = this.arrWords[countPage][countWord];
    const {wordTranslate: translateFalse} = this.arrWords[0].length > 1 ? this.getRandomTranslate() : {wordTranslate: 'Экспекто патронум'};
    this.currentWordTranslateDisplay = (Math.random() > 0.5) ? translateTrue : translateFalse;

    return `
      <div class="card-word__word-en">${word}</div>
      <div class="card-word__word-ru">${this.currentWordTranslateDisplay}</div>
      <div class="card-word__block-btn">
        <button class="card-word__btn btn btn--incorrect" type="button" data-check-translate="${translateFalse}" id="btnFalseAnswer">Неверно</button>
        <button class="card-word__btn btn btn--correct" type="button" data-check-translate="${translateTrue}" id="btnTrueAnswer">Верно</button>
      </div>
      <div class="card-word__block-img-btn">
        <img src="./icons/arrow-left.svg" alt="left">
        <img src="./icons/arrow-right.svg" alt="right">
      </div>
    `
  }

  private async getWordsFromCommonBase(level: number): Promise<IWord[][]> {
    const arrRandomPage = this.getRandomPages();
    const arrWordsForGame = await Promise.all(arrRandomPage.map(async (pageRandom) => await this.learnWords.getWordsAPI(level, pageRandom)));
    return arrWordsForGame;
  }

  private async getWordsFromTextbook(level: number, page: number | undefined) {
    const arrWordsForGame = [];
    let cntPage = page as number;

    if (level === 6) {
      const hardWords = await this.learnWords.getUserAggrHardWords();
      arrWordsForGame[0] = hardWords;
      return arrWordsForGame;
    }

    const arrAggrNoLearnedWords = [];
    while (cntPage >= 0) {
      const noLearnedWordsOnPage = (this.localStore.checkAuthUser()) ?
            await this.learnWords.getUserAggrNoLearnedWords(level, cntPage) :
            await this.learnWords.getWordsAPI(level, page);

      arrAggrNoLearnedWords.push(noLearnedWordsOnPage);
      cntPage -= 1;
    }

    arrWordsForGame[0] =arrAggrNoLearnedWords.flat();

    return arrWordsForGame;
  }

  private getRandomTranslate(): IWord {
    const {countPage, countWord} = this.control;
    const {wordTranslate: translateTrue} = this.arrWords[countPage][countWord];

    let randomWord = this.getRandomWord();
    while (translateTrue === randomWord.wordTranslate) {
      randomWord = this.getRandomWord();
    }

    return randomWord
  }

  private getRandomPages(page = 3) {
    return Array(page).fill(1).map(el => el * Math.floor(Math.random() * 30));
  }

  private getRandomWord(): IWord {
    return this.arrWords[this.control.countPage][Math.floor(Math.random() * this.arrWords[this.control.countPage].length)];
  }

  private getResultAnswers(result: 'correct' | 'incorrect') {
    const arrAnswer = (result === 'correct') ? this.arrCorrectAnswers : this.arrIncorrectAnswers;
    const fragment = document.createDocumentFragment();
    for (const item of arrAnswer) {
      const div = document.createElement('div');
      div.className = 'popup-sprint__word';
      div.innerHTML = `<span>${item.word}</span> - ${item.wordTranslate}`;
      fragment.appendChild(div);
    }
    return fragment;
  }
  /* ======================================================================================================== */

  /* TIMERS */
  private startClockUpdate = (time: number): void => {
    const timerText = document.querySelector('.timer__count') as HTMLElement;

    setTimeout(() => {
      const endTime = Date.now() + time * 1000;
      this.timerClock = window.setInterval(() => {
        const now = Date.now();
        const time = endTime - now;

        if (time >= 0) {

          const sec = Math.floor((time % (1000 * 60)) / 1000);
          timerText.innerText = `${sec}`;
        } else {
          clearInterval(this.timerClock);
        }
      },  1000);
    }, 1000)

  }

  private startTimeGame(time: number) {
    this.timerFinish = window.setTimeout(() => {
      this.finishGame();
    }, (time + 1) * 1000);
  }

  private startGameAgain() {
    this.points = 0;
    this.countCorrectAnswers = 0;
    this.control.countPage = 0;
    this.control.countWord = 0;
    this.arrCorrectAnswers = [];
    this.arrIncorrectAnswers = [];
    this.init().catch(err => console.log(err));
  }

  private finishGame(): void {
    try {
      window.clearTimeout(this.timerFinish);
      window.clearInterval(this.timerClock);
      document.removeEventListener('keydown', this.handlePageGameSprintKeydown);
      document.querySelector('.game-sprint__wrapper')?.classList.add('hidden');

      const popup = document.querySelector('.game-sprint__popup') as HTMLElement;
      popup.classList.remove('hidden');

      this.drawAnswersInPopup();

    } catch (error) {
      console.log(error);
    }
  }

  private closeGame(): void {
    window.clearTimeout(this.timerFinish);
    window.clearInterval(this.timerClock);
  }
  /* ======================================================================================================== */

  /* CHECK */
  private checkAvalibilityPage() {
    const {countWord, maxPage, maxWordsPage} = this.control;

    if (countWord === maxWordsPage - 1) {
      this.control.countWord = 0;
      this.control.countPage += 1;

      if (this.control.countPage === maxPage) {
        return false;
      }
    }
    this.control.countWord += 1;
    return true;
  }

  private checkAnswer(answer: boolean, word: IWord) {
    if (answer) {
      this.arrCorrectAnswers.push(word);
      this.applyCorrectAnswerStyle();
      this.points += 10;
      this.redrawPoints();
    } else {
      this.arrIncorrectAnswers.push(word);
      this.applyIncorrectAnswerStyle();
    }
  }
  /* ======================================================================================================== */

  /* APPLY */
  private applyCorrectAnswerStyle() {
    if (this.countCorrectAnswers < 3) {
      (document.querySelector(`[data-progress="${this.countCorrectAnswers}"]`) as HTMLElement).style.background = '#48ce76';
      this.countCorrectAnswers += 1;
    } else {
      (document.querySelector('.game-sprint__card-word') as HTMLElement).style.outlineColor = '#efc83e';
      setTimeout(() => (document.querySelector('.game-sprint__card-word') as HTMLElement).style.outlineColor = 'transparent', 250)
      this.countCorrectAnswers += 1;
    }
  }

  private applyIncorrectAnswerStyle() {
    const progress = document.querySelectorAll('[data-progress]');
    progress.forEach(el => (el as HTMLElement).style.background = '#F2695C');
    window.setTimeout(() => progress.forEach(el => (el as HTMLElement).style.background = '#D9D9D9'), 250);
    (document.querySelector('.game-sprint__card-word') as HTMLElement).style.outlineColor = 'transparent';
    this.countCorrectAnswers = 0;
  }
  /* ======================================================================================================== */

  /* HANDLERS */
  handlePageGameSprintClick = (evt: Event) => {
    const elem = evt.target as HTMLElement;

    if (elem.hasAttribute('data-check-translate')) {
      const word = this.arrWords[this.control.countPage][this.control.countWord];
      const answer = (elem.dataset.checkTranslate === this.currentWordTranslateDisplay);
      this.checkAnswer(answer, word);
      if (!this.checkAvalibilityPage()) {
        this.finishGame();
        return;
      }
      this.drawCardWord();
    }

    if (elem.closest('#sprintStartAgain')) {
      this.startGameAgain();
    }

    if (elem.closest('#backToGames') || elem.closest('#btnCloseSprint')) {
      this.closeGame();
      document.removeEventListener('keydown', this.handlePageGameSprintKeydown);
      window.history.back();
    }
  }

  handlePageGameSprintKeydown = (evt: KeyboardEvent) => {
    evt.preventDefault();

    const word = this.arrWords[this.control.countPage][this.control.countWord];
    const btnTrueAnswer = document.querySelector('#btnTrueAnswer') as HTMLButtonElement;
    const btnFalseAnswer = document.querySelector('#btnFalseAnswer') as HTMLButtonElement;

    if (evt.code === 'ArrowLeft') {
      btnFalseAnswer.style.transform = 'scale(0.93)';
      const answer = (btnFalseAnswer.dataset.checkTranslate === this.currentWordTranslateDisplay);
      this.checkAnswer(answer, word);
      if (!this.checkAvalibilityPage()) {
        this.finishGame();
        return;
      }
      window.setTimeout(() => this.drawCardWord(), 150);
    }

    if (evt.code === 'ArrowRight') {
      btnTrueAnswer.style.transform = 'scale(0.93)';
      const answer = (btnTrueAnswer.dataset.checkTranslate === this.currentWordTranslateDisplay);
      this.checkAnswer(answer, word);
      if (!this.checkAvalibilityPage()) {
        this.finishGame();
        return;
      }
      window.setTimeout(() => this.drawCardWord(), 150);
    }
  }

  listen() {
    document.querySelector('#gameSprint')?.addEventListener('click', this.handlePageGameSprintClick);
    document.addEventListener('keydown', this.handlePageGameSprintKeydown);
  }
}
