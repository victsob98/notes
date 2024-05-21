import { Note } from "../../types";
import { LocalStorageManager } from "../LocalStorage/LocalStorageManager";
import { v4 as uuidv4 } from "uuid";
import { renderInitialView, renderNotes } from "../Render/Renderers";

export class NoteManager {
  private allNotes: Note[] = [];

  constructor() {
    this.loadAndRenderNotes();
  }

  private loadAndRenderNotes() {
    this.allNotes =
      LocalStorageManager.loadItemsFromLocalStorage<Note>("notes");
    renderNotes(this.allNotes);
  }

  public addNote(title: string, description: string) {
    const newNote: Note = {
      id: uuidv4(),
      title,
      description,
      date: new Date().toISOString(),
    };
    LocalStorageManager.saveItemToLocalStorage<Note>("notes", newNote);
    this.loadAndRenderNotes();
  }

  public editNote(noteId: string, title: string, description: string) {
    const updatedNote: Note = {
      id: noteId,
      title,
      description,
      date: new Date().toISOString(),
    };
    LocalStorageManager.updateItemInLocalStorage<Note>("notes", updatedNote);
    this.loadAndRenderNotes();
  }

  public deleteNote(noteId: string) {
    LocalStorageManager.deleteFromLocalStorage<Note>("notes", noteId);
    this.loadAndRenderNotes();
  }

  public filterNotes(filterText: string) {
    const filteredNotes = this.allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(filterText) ||
        note.description.toLowerCase().includes(filterText)
    );
    renderNotes(filteredNotes);
    renderInitialView("No matching notes found");
  }
}
