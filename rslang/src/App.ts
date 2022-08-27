import { Authentication } from "./components/Authentication/Authentication";
import { Header } from "./components/Header/Header";
import { TestComponents } from "./components/TestComponents/TestComponents";

export default class App {
  header = new Header();
  testComponents = new TestComponents();
  authentication = new Authentication();

  start() {
    this.header.drawHeader();
    this.header.listen();

    this.testComponents.drawTestComponents();

    /* Authentication */
    this.authentication.drawLoginForm();
    this.authentication.listen();
  }
}