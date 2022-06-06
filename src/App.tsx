import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import dummyNotes from "./interfaces/dummyNotes";
import Note from "./components/Note";
import INote from "./interfaces/note.interface";
import { getNotes, deleteNote, createNote } from "./services/noteservice";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  const [darkMode, setDarkmode] = useState<Boolean>(false);
  const enableDarkMode = () => {
    setDarkmode(true);
  };
  const disableDarkMode = () => {
    setDarkmode(false);
  };
  const [isAddModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setDarkmode(false);
  };
  const openAddModal = () => {
    setAddModal(true);
    setDarkmode(true);
  };
  const [noteText, setNoteText] = useState<Partial<INote>>({
    text: "",
    link: "",
  });
  const handleTextChange = (e: any) => {
    setNoteText({ text: e.target.value, link: "temp.pk" });
  };
  const fetchNotes = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    // if (notesList.length > 0) {
    //   const noteListString = JSON.stringify(notesList);
    //   localStorage.setItem("notes-app", noteListString);
    // }
  }, [notesList]);

  const addNote = async () => {
    if (noteText.text?.length !== undefined && noteText.text.length > 0) {
      console.log("Hello", noteText);
      const savedNote = await createNote(noteText);
      console.log("Saved Note", savedNote);
      setNotesList([savedNote, ...notesList]);
      closeAddModal();
      setNoteText({ text: "", link: "" });
    } else {
      alert("Write Something to add a Note");
    }
  };

  const removeNote = async (noteId: string) => {
    const deletedNote = await deleteNote(noteId);
    console.log("Deleted Note", deletedNote);
    setNotesList(notesList.filter((note) => note._id !== noteId));
    console.log("After Delete", notesList);
  };

  const onNoteUpdate = (updatedNote: INote) => {
    console.log("Updated Text");
    console.log(notesList);
    console.log(updatedNote);
    const updatedNotesList = notesList.map((note) => {
      if (note._id === updatedNote._id) {
        return updatedNote;
      }
      return note;
    });
    setNotesList(updatedNotesList);
  };
  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <Button
        style={{
          width: "80px",
          height: "40",
          display: "flex",
          justifyContent: "center",
        }}
        variant="outline-warning"
        onClick={openAddModal}
      >
        Add Note ⌨️
      </Button>
      <Modal show={isAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note 📝</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTextArea2"
            label="Add Your Note Here 🖊️🙂"
          >
            <Form.Control type="text" onChange={handleTextChange} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create 📝
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="notes_list">
        {notesList.map((note, index) => {
          return (
            <Note
              note={note}
              onNoteUpdate={onNoteUpdate}
              onNoteDelete={removeNote}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
