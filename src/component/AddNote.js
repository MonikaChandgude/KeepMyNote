import React, { useContext, useState } from "react";
import noteContext from "../context/notes/Notecontext";
import CalendarPicker from './CalendarPicker'; 

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [isRinging, setIsRinging] = useState(false);
  //const [events, setEvents] = useState(null);

  const toggleRing = () => {
    setIsRinging(!isRinging);
   
  };
  const handleDateSelection = (date) => {
   // setEvents(date);
    // Here you can handle setting the reminder using your calendar API
    // For simplicity, I'll just log the selected date for now
    console.log('Reminder set for:', date);
  };


  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });

    props.showAlert("Added Succesfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        className="container my-3"
        style={{
          background: "#eeeee4",
          width: "60%",
          padding: "10px",
          borderRadius: "25px",
        }}
      >
        <form className="px-3">
          <h2> Notes </h2>
          {/* <img  className="text-center mb-3" src="note.png" style={{ height: "7vh" }} alt="icon"/> */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={note.title}
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
            <pre>
              <textarea
                style={{ whiteSpace: "pre-line" }}
                type="textarea"
                className="form-control"
                name="description"
                id="description"
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
              />
            </pre>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label ">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div
            className="d-flex my-2"
            style={{ fontSize: "25px", padding: "5px" }}
          >
            <div className="col-3">
              {" "}
              <i className="fa-solid fa-list-check"></i>
            </div>
            <div className="col-3">
            <i className="fa-solid fa-bold"></i>
            </div>
            <div className="col-3">
              {" "}
              <i className="fa-solid fa-images"></i>
            </div>
            <div className="col-3" onClick={toggleRing}>
             <div>
              {isRinging ? (
                <i className="fa-solid fa-bell"></i>
              ) : (
                <i className="fa-solid fa-bell-slash"></i>
              )}
              </div>
              {isRinging && (
        <CalendarPicker onDateSelect={handleDateSelection} />
      )}


            </div>
           
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
