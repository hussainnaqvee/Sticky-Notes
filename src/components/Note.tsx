import React, {
  useState,
  useEffect,
  FC,
  FocusEvent,
  KeyboardEventHandler,
} from "react";
import "./Note.css";
import axios from "axios";
import INote from "../interfaces/note.interface";
import { Button } from "react-bootstrap";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (noteId: string) => Promise<void>;
};
const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const onTextBlur = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocus(false);
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

  const deleteNote = () => {
    onNoteDelete(note._id);
  };
  return (
    <div className="note">
      <Button className="btn-close" onClick={deleteNote} />
      <div
        className={isFocus ? "note_text note_text_focus" : "note_text"}
        contentEditable={true}
        suppressContentEditableWarning={true}
        // onFocus={() => setIsFocus(true)}
        onBlur={onTextBlur}
        onKeyDown={(e) => {
          e.key === "Escape" ? setIsFocus(false) : setIsFocus(true);
        }}
      >
        {note.text}
      </div>
      {/* <div className="note_link">
        <a href={note.link}>{note.link}</a>
      </div> */}
    </div>
  );
};

export default Note;
