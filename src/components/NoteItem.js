import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <span className="badge bg-primary">{note.tag}</span>
        </div>
      </div>
    </div>
  );
}
