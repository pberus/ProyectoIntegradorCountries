import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Activities, Detail, Form, Home, Landing } from "./views";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = `${import.meta.env.VITE_BACKEND_URL}/` || "http://localhost:3001/";

function App() {
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const loginURL =
        URL +
        `login/?email=${email}&password=${password}
        `;
      const { data } = await axios(loginURL);
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      error.response && error.response.data
        ? alert(error.response.data)
        : alert(error.message);
    }
  };

  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing login={login} />} />
        <Route path='/home' element={<Home logout={logout}/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail/:ID' element={<Detail />} />
        <Route path="/activities" element={<Activities />}/>
      </Routes>
    </div>
  );
}

export default App;
