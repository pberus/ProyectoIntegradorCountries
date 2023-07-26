import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {Nav} from "./components"
import { Detail, Form, Home, Landing } from "./views";

function App() {
  
  const location = useLocation()


  return (
    <div>
      {location.pathname !== "/" && (
        <Nav />
      )}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;