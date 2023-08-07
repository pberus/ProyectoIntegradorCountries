import { useState } from "react";
import validate from "./validate";
import style from "./LoginForm.module.css";

const LoginForm = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({
      ...userData,
      [property]: value,
    });
    setErrors(
      validate({
        ...userData,
        [property]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(userData));
    setShowErrors(true);
    login(userData);
  };

  return (
    <div className={style.formContainer}>
      <h1 className={style.title}>Inicia Sesion</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.credentials}>
          <label htmlFor='email'>EMAIL</label>
          <input
            onChange={handleChange}
            value={userData.email}
            name='email'
            type='text'
          />
          {showErrors && errors.email && <span>{errors.email}</span>}
        </div>
        <div className={style.credentials}>
          <label htmlFor='password'>PASSWORD</label>
          <input
            onChange={handleChange}
            value={userData.password}
            name='password'
            type='password'
          />
          {showErrors && errors.password && <span>{errors.password}</span>}
        </div>
        <button className={style.loginBtn}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;