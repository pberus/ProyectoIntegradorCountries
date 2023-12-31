/* eslint-disable react/prop-types */
import { useState } from "react";

const LoginForm = ({ login }) => {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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
          type='password'
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
