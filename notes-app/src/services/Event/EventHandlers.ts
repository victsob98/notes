import { ConfirmationModal } from "../../components/ConfirmationModal";
import { NoteForm } from "../../components/NoteForm";
import { getNoteInputs } from "../Notes/NotesManager.helpers";
import { NoteManager } from "../Notes/NotesManger";
import { renderInitialView } from "../Render/Renderers";
import { addInputEventListeners } from "./EventListeners";

export const handleCancelEvent = () => {
  renderInitialView();
};

export const handleAddNoteEvent = (
  noteManager: NoteManager,
  insertDiv: HTMLDivElement | null
) => {
  if (insertDiv) {
    insertDiv.innerHTML = NoteForm();
    addInputEventListeners(noteManager);
  }
};

export const handleSearchInput = (noteManager: NoteManager, event: Event) => {
  const target = event.target as HTMLInputElement;
  const filterText = target.value.toLowerCase();
  noteManager.filterNotes(filterText);
};

export const handleDeleteNoteEvent = (
  noteManager: NoteManager,
  target: HTMLElement
) => {
  const li = target.closest("li.note-item");
  if (li) {
    const noteId = li.getAttribute("data-id");
    if (noteId) {
      handleShowModal(() => {
        noteManager.deleteNote(noteId);
        renderInitialView();
      });
    }
  }
};

export const handleEditNoteEvent = (
  noteManager: NoteManager,
  target: HTMLElement,
  insertDiv: HTMLDivElement | null
) => {
  const li = target.closest("li.note-item");
  if (li) {
    const noteId = li.getAttribute("data-id");
    const noteTitleElement = li.querySelector<HTMLElement>(".note-title");
    const noteDescriptionElement =
      li.querySelector<HTMLElement>(".note-description");
    const noteDateElement = li.querySelector<HTMLElement>(".note-date");

    const areNoteElementsPresent =
      noteId && noteTitleElement && noteDescriptionElement && noteDateElement;

    if (areNoteElementsPresent) {
      const noteTitle = noteTitleElement.innerText;
      const noteDescription = noteDescriptionElement.innerText;
      const noteDate = noteDateElement.innerText;

      if (insertDiv) {
        insertDiv.innerHTML = NoteForm({
          id: noteId,
          title: noteTitle,
          description: noteDescription,
          date: noteDate,
        });
        addInputEventListeners(noteManager);
      }
    }
  }
};

export const handleClickEvent = (
  event: MouseEvent,
  noteManager: NoteManager
) => {
  const target = event.target as HTMLElement;
  const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");

  if (target.classList.contains("note-view-cancel")) {
    handleCancelEvent();
  } else if (target.classList.contains("addNoteBtn")) {
    handleAddNoteEvent(noteManager, insertDiv);
  } else if (target.closest(".deleteNote")) {
    handleDeleteNoteEvent(noteManager, target);
  } else if (target.closest(".editNote")) {
    handleEditNoteEvent(noteManager, target, insertDiv);
  }
};

export const handleFormSubmit = (event: Event, noteManager: NoteManager) => {
  event.preventDefault();
  const noteIdInput = document.querySelector<HTMLInputElement>("#noteIdInput");
  const { noteTitleInput, textAreaInput } = getNoteInputs();

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
};

export const handleShowModal = (confirmCallback: () => void) => {
  const modalHtml = ConfirmationModal();
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  document.getElementById("confirmButton")!.addEventListener("click", () => {
    confirmCallback();
    handleCloseModal();
  });

  document.getElementById("cancelButton")!.addEventListener("click", () => {
    handleCloseModal();
  });
};

export const handleCloseModal = () => {
  const modal = document.querySelector(".modal-overlay");
  if (modal) {
    modal.remove();
  }
};
