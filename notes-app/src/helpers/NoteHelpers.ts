import { Note } from "../types";
import {
  deleteNoteFromLocalStorage,
  loadNotesFromLocalStorage,
} from "./LocalStorageHelpers";

export function addNoteToList(note: Note, notesList: HTMLUListElement) {
  const li = document.createElement("li");
  li.className = "note-item";
  li.dataset.id = note.id; // Use data attribute to store note ID
  li.innerHTML = `<div><p>${note.title}</p>${note.description}<p>${note.date}</p></div>`;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<img src="../assets/icons/editIcon.svg">';
  editBtn.className = "note-button";
  editBtn.onclick = () => editNoteInDOM(li, note);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<img src="../assets/icons/deleteIcon.svg">';
  deleteBtn.className = "note-button delete";
  deleteBtn.onclick = () => deleteNoteFromDOMAndStorage(li, note.id);

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  notesList.appendChild(li);
}

export function deleteNoteFromDOMAndStorage(
  noteElement: HTMLLIElement,
  id: string
) {
  // Remove the note from the DOM
  const notesList = document.querySelector<HTMLUListElement>("#notesList");
  if (notesList && noteElement) {
    notesList.removeChild(noteElement);
  }

  // Remove the note from local storage
  deleteNoteFromLocalStorage(id);
}
function editNoteInDOM(noteElement: HTMLLIElement, note: Note) {
  const newTitle = prompt("Edit your note title:", note.title);
  const newDescription = prompt(
    "Edit your note description:",
    note.description
  );

  if (newTitle && newDescription) {
    noteElement.querySelector("p")!.textContent = newTitle;
    noteElement.querySelector("div p:nth-child(2)")!.textContent =
      newDescription;

    // Update the note in local storage
    const notes = loadNotesFromLocalStorage();
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    if (noteIndex > -1) {
      notes[noteIndex].title = newTitle;
      notes[noteIndex].description = newDescription;
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }
}
