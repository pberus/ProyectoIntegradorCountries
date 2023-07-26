import "./App.css";
import { Route, Routes, useNavigate} from "react-router-dom";
import { Detail, Form, Home, Landing } from "./views";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const access = useSelector(state => state.access)
  const navigate = useNavigate()

  
  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  return (
    <div>
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