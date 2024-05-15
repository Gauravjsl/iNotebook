import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };
  const handelOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              value={note.title}
              onChange={handelOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripton
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              value={note.description}
              onChange={handelOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              value={note.tag}
              onChange={handelOnChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleOnClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
