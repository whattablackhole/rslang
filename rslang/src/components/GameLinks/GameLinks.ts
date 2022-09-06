export class GameLinks {
  drawGameLinks() {
    const textbookWrapper = document.querySelector(
      ".textbook__wrapper"
    ) as HTMLElement;

    const gameLinksBlock = document.createElement("div");
    gameLinksBlock.classList.add("wrapper__gamelinks-block");

    gameLinksBlock.innerHTML = `
    <a href="/#/books/audiocall" class="gamelinks-block__audiogame-block">
        <img src="./audioGameIcon.svg" alt="photo: audio-game">
        <span class="audiogame-block__text">Аудиовызов</span>
    </a>

    <a href="/#/books/sprint" class="gamelinks-block__sprintgame-block">
        <img src="./sprintGameIcon.svg" alt="photo: sprint-game">
        <span class="sprintgame-block__text">Спринт</span>
    </a>
    `;

    textbookWrapper.prepend(gameLinksBlock);
  }
}
