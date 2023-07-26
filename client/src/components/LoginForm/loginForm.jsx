import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  
  const access = useSelector(state => state.access)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    access && navigate("/home");
  }, [access]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(userData))
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
