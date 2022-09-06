import Router from "./Router";
import "./RouteConstants";

import { TextBook } from "../../pages/TextBook/TextBook";
import { App } from "../../App";
import RouteConstants from "./RouteConstants";
import { Games } from "../../pages/Games/Games";
import { LocalStoreAPI } from "../API/LocalStoreAPI";
import { SprintGame } from "../../pages/GameSprint/GameSprint";
import { GameAudioCall } from "../../pages/GameAudioCall/GameAudioCall";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { StatPage } from "../../pages/StatPage/StatPage";

const app = new App();
const books = new TextBook();
const games = new Games();
const localStore = new LocalStoreAPI();
const about = new AboutPage();
const stat = new StatPage();

const router = new Router({
    mode: 'hash',
    root: '/'
  });

export function RouteStatus () {
  router
    .add(/books\/sprint/, () => {
      const group = localStore.getValue('group');
      const pageTextbook = localStore.getValue('page');
      const sprintGame = new SprintGame({state: 'textbook', level: group as number, page: (pageTextbook as number) - 1});
      sprintGame.init().catch(err => console.log(err));
    })
    .add(/books\/audiocall/, () => {
      const group = localStore.getValue('group');
      const pageTextbook = localStore.getValue('page');
      const audiocall = new GameAudioCall({state: 'textbook', level: group as number, page: (pageTextbook as number) - 1});
      audiocall.init().catch(err => console.log(err));
    })
    .add(/books/, () => {
      books.drawTextBookComponents();
    })
    .add(/about/, () => {
      about.drawPage();
    })
    .add(/stat/, () => {
      stat.drawPage();
      stat.init();
    })
    .add(/games\/sprint\/level-(.*)/, () => {
      const arrPath = window.location.hash.split('/');
      const levelInPathReg = arrPath[arrPath.length - 1].match(/\d+/);

      if (levelInPathReg?.length) {
        const levelGame = +levelInPathReg[0];
        const sprintGame = new SprintGame({state: 'games', level: levelGame});
        sprintGame.init().catch(err => console.log(err));
      }
    })
    .add(/games\/audiocall\/level-(.*)/, () => {
      const arrPath = window.location.hash.split('/');
      const levelInPathReg = arrPath[arrPath.length - 1].match(/\d+/);

      if (levelInPathReg?.length) {
        const levelGame = +levelInPathReg[0];
        const audioCall = new GameAudioCall({state: 'games', level: levelGame});
        audioCall.init().catch(err => console.log(err));
      }
    })
    .add(/games/, () => {
      games.init();
    })
    .add(RouteConstants.EMPTY_FILLER, () => {
      app.init();
    })
}
