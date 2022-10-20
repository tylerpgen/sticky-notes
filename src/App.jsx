import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  //Local Storage

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("sticky-notes-saved-data")
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sticky-notes-saved-data", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <div className="flex-wrapper">
        <CreateArea onAdd={addNote} />
        <div className="note-area">
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
