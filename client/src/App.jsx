import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Detail, Form, Home, Landing } from "./views";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3001/";

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
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing login={login} />} />
        <Route path='/home' element={<Home logout={logout}/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail/:ID' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
