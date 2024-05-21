import { EmptyContent } from "../../components/EmptyContent";
import { NoteList } from "../../components/NoteList";
import { Note } from "../../types";

export const renderNotes = (notes: Note[]) => {
  const notesListContainer =
    document.querySelector<HTMLDivElement>("#listContainer");
  if (notesListContainer) {
    notesListContainer.innerHTML = NoteList(notes);
  }
};

export const renderInitialView = (title?: string) => {
  const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");
  const notes = document.querySelector<HTMLDivElement>("#notesList")?.children;

  if (insertDiv) {
    if (notes?.length === 0) {
      insertDiv.innerHTML = EmptyContent(title ?? "No notes yet");
    } else {
      insertDiv.innerHTML =
        '<button type="button" class="addNoteBtn primary full-width">Add new</button>';
    }
  }
};
