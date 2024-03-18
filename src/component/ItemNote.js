//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import noteContext from "../context/notes/Notecontext";

const ItemNote = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title} </h5>
          <p style={{ whiteSpace: "pre-line" }} className="card-text">
            {note.description}
          </p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted SUccessfully");
            }}
          ></i>

          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <div style={{ textAlign: "right" }}>
            <p className="card-text my-2">
              {new Date(note.date)
                .toGMTString()
                .split(" ")
                .slice(0, 4)
                .join(" ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemNote;
