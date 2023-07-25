import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3001/";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const login = async (userData) => {
    try {
      const { email, password } = userData;

      const { data } = await axios(
        URL + `login/?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          placeholder='ejemplo@mail.com'
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='password'
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
