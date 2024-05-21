import { Note } from "../../types";
import { NoteItem } from "../NoteItem";

export const NoteList = (filteredNotes: Note[]) => {
  return `
      <ul id="notesList" class="notes-list-display" >
        ${filteredNotes
          .map(
            (note) => `
        ${NoteItem(note)}
        `
          )
          .join("")}
      </ul>
    `;
};
