import { Note } from "../../types";

export const NoteForm = (note?: Note) => `
  <div class="note-view-container">
    <form id="addNoteForm" class="note-view-form">
      <div class="note-view-title-container">
        <input type="text" id="noteTitleInput" class="note-view-input" value="${
          note?.title ? note.title : ""
        }" placeholder="Add new note" required />
        <button type="button" class="note-view-cancel">Cancel</button>
        ${
          note
            ? `<input type="hidden" id="noteIdInput" value="${note.id}" />`
            : ""
        }
      </div>
      <div class="note-view-textarea-container">
        <textarea id="textAreaInput" class="note-view-textarea" placeholder="Type your note..." required>${
          note?.description ? note.description : ""
        }</textarea>
        <button type="submit" class="saveNote action-button primary">${
          note ? "Edit" : "Add"
        }</button>
      </div>
    </form>
  </div>
`;
