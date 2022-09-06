import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage/MainPage";

export class App {
  header = new Header();
  mainPage = new MainPage();
  footer = new Footer();

  init() {
    (document.querySelector('#page') as HTMLElement).innerHTML = '';
    this.start();
  }

  start() {
    this.header.init();
    this.mainPage.init();
    this.footer.init();
  }
}