export class Footer {
  init = (): void => {
    this.draw();
  }

  draw = (): void => {
    const bodyEl = document.querySelector('#page') as HTMLElement;
    const footerEl = document.createElement("footer") as HTMLBodyElement;
    footerEl.className = 'footer';
    footerEl.innerHTML = `
      <div class="footer__container">
        <a class="footer__img" href="https://rs.school/" target="_blank">
          <img class="" src="./rsschool.svg" alt="RSSchool">
        </a>
        <nav class="footer__nav">
          <img class="footer__nav-icon" src="./icons/gith-logo.svg" alt="github">
          <a class="footer__nav-link" href="https://github.com/nvfnvm" target="_blank">nvfnvm</a>
          <a class="footer__nav-link" href="https://github.com/Konstantsin-Shumak" target="_blank">shumak_k</a>
          <a class="footer__nav-link" href="https://github.com/zzzhuchok" target="_blank">zzzhuchok</a>
          <a class="footer__nav-link" href="https://github.com/whattablackhole" target="_blank">whattablackhole</a>
        </nav>
        <div class="footer__copyright">© 2022</div>
      </div>
    `;
    bodyEl.appendChild(footerEl);
  }
}