export const getNoteInputs = () => {
  const noteTitleInput =
    document.querySelector<HTMLInputElement>("#noteTitleInput");
  const textAreaInput =
    document.querySelector<HTMLTextAreaElement>("#textAreaInput");
  return { noteTitleInput, textAreaInput };
};

export const checkInputs = (
  noteTitleInput: HTMLInputElement,
  textAreaInput: HTMLTextAreaElement,
  saveNoteButton: HTMLButtonElement
) => {
  saveNoteButton.disabled =
    noteTitleInput.value.trim() === "" || textAreaInput.value.trim() === "";
};
