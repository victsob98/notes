import { NoteForm } from "../components/NoteForm";
import { NoteManager } from "./NotesManger";
import { renderInitialView } from "./RenderHelpers";

export const setupEventDelegation = (noteManager: NoteManager) => {
  document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");

    if (target.classList.contains("note-view-cancel")) {
      renderInitialView();
    } else if (target.classList.contains("addNoteBtn")) {
      if (insertDiv) {
        insertDiv.innerHTML = NoteForm();
        addInputEventListeners(noteManager);
      }
    } else if (target.classList.contains("deleteNote")) {
      const li = target.closest("li.note-item");
      if (li) {
        const noteId = li.getAttribute("data-id");
        if (noteId) {
          noteManager.deleteNote(noteId);
        }
      }
    } else if (target.classList.contains("editNote")) {
      const li = target.closest("li.note-item");
      if (li) {
        const noteId = li.getAttribute("data-id");
        const noteTitle = li.querySelector(".note-title").innerText;
        const noteDescription = li.querySelector(".note-description").innerText;

        if (insertDiv) {
          insertDiv.innerHTML = NoteForm({
            id: noteId,
            title: noteTitle,
            description: noteDescription,
          });
          addInputEventListeners(noteManager);
        }
      }
    }
  });

  const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const filterText = target.value.toLowerCase();
      noteManager.filterNotes(filterText);
    });
  }
};

const addInputEventListeners = (noteManager: NoteManager) => {
  const noteTitleInput =
    document.querySelector<HTMLInputElement>("#noteTitleInput");
  const textAreaInput =
    document.querySelector<HTMLTextAreaElement>("#textAreaInput");
  const saveNoteButton = document.querySelector<HTMLButtonElement>(".saveNote");
  const addNoteForm = document.querySelector<HTMLFormElement>("#addNoteForm");

  if (noteTitleInput && textAreaInput && saveNoteButton) {
    const checkInputs = () => {
      saveNoteButton.disabled =
        noteTitleInput.value.trim() === "" || textAreaInput.value.trim() === "";
    };

    noteTitleInput.addEventListener("input", checkInputs);
    textAreaInput.addEventListener("input", checkInputs);

    checkInputs();
  }

  if (addNoteForm) {
    addNoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const noteIdInput =
        document.querySelector<HTMLInputElement>("#noteIdInput");
      const noteTitleInput =
        document.querySelector<HTMLInputElement>("#noteTitleInput");
      const textAreaInput =
        document.querySelector<HTMLTextAreaElement>("#textAreaInput");

      if (noteTitleInput && textAreaInput) {
        const title = noteTitleInput.value.trim();
        const description = textAreaInput.value.trim();
        const noteId = noteIdInput ? noteIdInput.value : null;

        if (title === "" || description === "") {
          alert("Both title and description must be filled out.");
          return;
        }

        if (noteId) {
          noteManager.editNote(noteId, title, description);
        } else {
          noteManager.addNote(title, description);
        }

        noteTitleInput.value = "";
        textAreaInput.value = "";

        renderInitialView();
      }
    });
  }
};
