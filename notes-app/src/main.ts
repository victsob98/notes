import "./style.css";
import { App } from "./components/App.ts";

import { NoteManager } from "./services/Notes/NotesManger.ts";
import { setupEventDelegation } from "./services/Event/EventListeners.ts";
import { renderInitialView } from "./services/Render/Renderers.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = App();

const noteManager = new NoteManager();

const initializeApp = () => {
  setupEventDelegation(noteManager);
  renderInitialView();
};

document.addEventListener("DOMContentLoaded", initializeApp);
