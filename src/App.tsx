import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import dummyNotes from "./interfaces/dummyNotes";
import Note from "./components/Note";
import INote from "./interfaces/note.interface";
function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  const [darkMode, setDarkmode] = useState<Boolean>(false);
  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/notes');
  //     setNotesList(response.data.notes);
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    const notesFromStorage = localStorage.getItem("notes-app");
    if (notesFromStorage) {
      setNotesList(JSON.parse(notesFromStorage));
    } else {
      setNotesList(dummyNotes);
    }
  }, []);

  useEffect(() => {
    if (notesList.length > 0) {
      const noteListString = JSON.stringify(notesList);
      localStorage.setItem("notes-app", noteListString);
    }
  }, [notesList]);

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
    <div className="App">
      <div className="notes_list">
        {notesList.map((note, index) => {
          return <Note note={note} onNoteUpdate={onNoteUpdate} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
