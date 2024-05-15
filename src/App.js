import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";




function App() {
  const [alert, setAlert] = useState(null);
  //function for setAlert
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null);
    }, 1500)
    }
  return (
    
    <BrowserRouter>
    <NoteState>
    <Navbar />
    <Alert  alert={alert}/>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert} />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route path="/signup" element={<SignUp showAlert={showAlert}/>}/>
    </Routes>
    </div>
    </NoteState>
    </BrowserRouter>
       
  );
}

export default App;
