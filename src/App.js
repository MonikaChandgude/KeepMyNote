import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import NoteState from "./context/notes/NoteState";
import About from "./component/About";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Alert from "./component/Alert";



function App() {
  const[alert, setAlert]=useState(null);
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 2000);
  }
  return (
    <div className="App">
      <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
        {/* <Route exact path="/entertainment" />
        <Route exact path="/technology"  /> */}
       
      </Routes>
      </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
