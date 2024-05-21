import { debounce } from "../../utils/utils";
import { checkInputs, getNoteInputs } from "../Notes/NotesManager.helpers";
import { NoteManager } from "../Notes/NotesManger";
import { handleClickEvent, handleFormSubmit } from "./EventHandlers";

export const setupEventDelegation = (noteManager: NoteManager) => {
  document.body.addEventListener("click", (event) => {
    handleClickEvent(event, noteManager);
    setupSearchInput(noteManager);
  });
};

export const setupSearchInput = (noteManager: NoteManager) => {
  const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
  if (searchInput) {
    const debouncedFilterNotes = debounce((filterText: string) => {
      noteManager.filterNotes(filterText);
    }, 500);

    searchInput.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const filterText = target.value.toLowerCase();
      debouncedFilterNotes(filterText);
    });
  }
};

export const addInputEventListeners = (noteManager: NoteManager) => {
  const { noteTitleInput, textAreaInput } = getNoteInputs();
  const saveNoteButton = document.querySelector<HTMLButtonElement>(".saveNote");
  const addNoteForm = document.querySelector<HTMLFormElement>("#addNoteForm");

  const areAllElementsSelected =
    noteTitleInput && textAreaInput && saveNoteButton;

  if (areAllElementsSelected) {
    const checkInputsWrapper = () =>
      checkInputs(noteTitleInput, textAreaInput, saveNoteButton);

    noteTitleInput.addEventListener("input", checkInputsWrapper);
    textAreaInput.addEventListener("input", checkInputsWrapper);

    checkInputsWrapper();
  }

  if (addNoteForm) {
    addNoteForm.addEventListener("submit", (event) =>
      handleFormSubmit(event, noteManager)
    );
  }
};
