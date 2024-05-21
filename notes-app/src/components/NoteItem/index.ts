import { Note } from "../../types";

export const NoteItem = (note: Note) => `
  <li class="note-item" data-id="${note.id}">
    <div class="note-container">
      <div class="note-header">
        <h3 class="note-title">${note.title}</h3>
        <div class="buttonGroup">
          <button class="editNote note-button">
            <img src="../assets/icons/editIcon.svg" alt="Edit">
          </button>
          <button class="deleteNote note-button">
            <img src="../assets/icons/deleteIcon.svg" alt="Delete">
          </button>
        </div>
      </div>
      <p class="note-description">${note.description}</p>
      <p class="note-date">${new Date(note.date).toLocaleDateString()}</p>
    </div>
  </li>
`;
