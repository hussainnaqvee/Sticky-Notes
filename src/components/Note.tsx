import React, { useState, useEffect, FC, FocusEvent } from "react";
import "./Note.css";
import axios from "axios";
import INote from "../interfaces/note.interface";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};
const Note: FC<Props> = ({ note, onNoteUpdate }) => {
  const onTextBlur = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    const updatedNote: INote = {
      ...note,
      text: event.currentTarget.textContent || "",
    };
    onNoteUpdate(updatedNote);
  };
  return (
    <div className="note">
      <div
        className="note_text"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={onTextBlur}
      >
        {note.text}
      </div>
      <div className="note_link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
