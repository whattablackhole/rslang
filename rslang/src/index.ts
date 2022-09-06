import { App } from "./App";
import { RouteStatus } from "./services/Router/RouteInit";
import "./styles/style.scss";

const app = new App();

app.start();
void RouteStatus();
