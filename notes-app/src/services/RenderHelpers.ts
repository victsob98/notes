import { EmptyContent } from "../components/EmptyContent";
import { NoteList } from "../components/NoteList";
import { loadNotesFromLocalStorage } from "../helpers/LocalStorageHelpers";
import { Note } from "../types";

export const renderNotes = (notes: Note[]) => {
  const notesListContainer =
    document.querySelector<HTMLDivElement>("#listContainer");
  if (notesListContainer) {
    notesListContainer.innerHTML = NoteList(notes);
  }
};

export const renderInitialView = () => {
  const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");
  const notes = loadNotesFromLocalStorage();

  if (insertDiv) {
    if (notes.length === 0) {
      insertDiv.innerHTML = EmptyContent();
    } else {
      insertDiv.innerHTML =
        '<button type="button" class="addNoteBtn primary full-width">Add new</button>';
    }
  }
};
