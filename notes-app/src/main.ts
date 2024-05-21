import "./style.css";
import { App } from "./components/App.ts";

import { NoteManager } from "./services/NotesManger.ts";
import { setupEventDelegation } from "./services/EventHandlers.ts";
import { renderInitialView } from "./services/RenderHelpers.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = App();

const noteManager = new NoteManager();

const initializeApp = () => {
  setupEventDelegation(noteManager);
  renderInitialView();
};

document.addEventListener("DOMContentLoaded", initializeApp);
