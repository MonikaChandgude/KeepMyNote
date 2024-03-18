import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/Notecontext";
import ItemNote from "./ItemNote";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
 
  const [showForm, setShowForm] = useState(false);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    //setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleClick = (e) => {
    console.log("updating the note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Succesfully", "success");
    // addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    // setNote(prevNote => ({
    //   ...prevNote,
    //   [e.target.name]: e.target.value
    // }));
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick1 = () => {
    setShowForm(true);
  };
  return (
    <>
       <div className="text-center">
        <button className="btn btn-primary my-3 " onClick={handleClick1}>
         Clik to add New Note
        </button>
        {showForm && <AddNote showAlert={props.showAlert} />}
      </div>
      {/* <AddNote showAlert={props.showAlert} /> */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etag"
                    id="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <h2 className="text-center"> Your Notes</h2>
        <p style={{ color: "gray", textAlign:"center"}}>
          {notes.length === 0 && "Nothing to Display"}
        </p>

        {notes ? (
          // Render the notes when available
          notes.map((note) =>
         {console.log("Note _id:", note._id); // Add this console log
           return <ItemNote key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} 
        />})
        ) : (
          // Render a loading indicator or placeholder
          <p>Loading...</p>
        )}
       
      </div>
    </>
  );
};

export default Notes;
