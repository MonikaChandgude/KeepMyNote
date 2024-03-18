import { useEffect, useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  // const [token, setToken] = useState("");
  // // Fetch token from localStorage on component mount
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);

  //Add note
  //let token = localStorage.getItem("token");
  const addNote = async (title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
     
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMzM0NTQ5MTM4YTZlMzgxNWNjZWU4In0sImlhdCI6MTcxMDQzNzQ2MH0.HrLz7Zb2XmlwqqkfGQGRpMenDtvCJZJrO4hPh0aP9fM",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    
    setNotes(notes.concat(note));

    // console.log(response.json)
  };

  //GET ALL note
  //GET ALL notes
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
         
       // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMzM0NTQ5MTM4YTZlMzgxNWNjZWU4In0sImlhdCI6MTcxMDQzNzQ2MH0.HrLz7Zb2XmlwqqkfGQGRpMenDtvCJZJrO4hPh0aP9fM",
        },

      }
    
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      // Handle the error, perhaps by showing a message to the user
    }
  };

  
  //Delete Note
  const deleteNote = async (id) => {
    //Todo: api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMzM0NTQ5MTM4YTZlMzgxNWNjZWU4In0sImlhdCI6MTcxMDQzNzQ2MH0.HrLz7Zb2XmlwqqkfGQGRpMenDtvCJZJrO4hPh0aP9fM",
       
      },
    });
    const json = response.json();
    // console.log(json)

    //console.log("deleted" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMzM0NTQ5MTM4YTZlMzgxNWNjZWU4In0sImlhdCI6MTcxMDQzNzQ2MH0.HrLz7Zb2XmlwqqkfGQGRpMenDtvCJZJrO4hPh0aP9fM",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //  console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to api call
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
